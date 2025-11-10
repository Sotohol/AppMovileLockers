import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ModalScreen() {
  const [busqueda, setBusqueda] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [fecha, setFecha] = useState(new Date());
  const [horaInicio, setHoraInicio] = useState(new Date());
  const [horaFin, setHoraFin] = useState(new Date());
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [modoPicker, setModoPicker] = useState(null);

  const [reservas, setReservas] = useState([
    { id: "1", casillero: "A-101", estado: "Disponible" },
    { id: "2", casillero: "A-102", estado: "Ocupado", horaInicio: "09:00", horaFin: "13:00" },
    { id: "3", casillero: "B-201", estado: "Disponible" },
    { id: "4", casillero: "B-202", estado: "Ocupado", horaInicio: "14:30", horaFin: "18:00" },
  ]);

  const reservasFiltradas = reservas.filter((item) =>
    item.casillero.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleReserva = (item) => {
    if (item.estado === "Disponible") {
      setReservaSeleccionada(item);
      setModalVisible(true);
    } else {
      Alert.alert(
        "Casillero ocupado",
        `El casillero ${item.casillero} está reservado de ${item.horaInicio} a ${item.horaFin}.`
      );
    }
  };

  const confirmarReserva = () => {
    const inicio = new Date(horaInicio);
    const fin = new Date(horaFin);

    if (fin <= inicio) {
      Alert.alert("Horario inválido", "La hora final debe ser posterior a la hora de inicio.");
      return;
    }

    const horaInicioNum = inicio.getHours() + inicio.getMinutes() / 60;
    const horaFinNum = fin.getHours() + fin.getMinutes() / 60;
    if (horaInicioNum < 7 || horaFinNum > 21) {
      Alert.alert("Horario no permitido", "Solo se puede reservar entre 7:00 am y 9:00 pm.");
      return;
    }

    const duracion = (fin - inicio) / (1000 * 60 * 60);
    if (duracion < 1) {
      Alert.alert("Duración insuficiente", "La reserva debe durar al menos 1 hora.");
      return;
    }

    setReservas((prev) =>
      prev.map((r) =>
        r.id === reservaSeleccionada.id
          ? {
              ...r,
              estado: "Ocupado",
              horaInicio: inicio.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              horaFin: fin.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            }
          : r
      )
    );

    setModalVisible(false);
    Alert.alert("✅ Reserva confirmada", `Casillero ${reservaSeleccionada.casillero} reservado.`);
  };

  const renderReserva = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.reservaItem,
        item.estado === "Disponible" ? styles.disponible : styles.ocupado,
        styles.cardShadow,
      ]}
      onPress={() => handleReserva(item)}
    >
      <ThemedText style={styles.casillero}>{item.casillero}</ThemedText>
      <ThemedText style={styles.estado}>
        {item.estado === "Disponible"
          ? "Disponible todo el día"
          : `Ocupado de ${item.horaInicio} a ${item.horaFin}`}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.titulo}>
        Reservar Casillero
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="🔍 Buscar casillero (ej. A-101)"
        placeholderTextColor="#999"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      <FlatList
        data={reservasFiltradas}
        renderItem={renderReserva}
        keyExtractor={(item) => item.id}
        style={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal elegante */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={[styles.modalBox, styles.cardShadow]}>
            <ThemedText style={styles.modalTitle}>
              Reservar {reservaSeleccionada?.casillero}
            </ThemedText>

            <View style={styles.pickerRow}>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setModoPicker("fecha")}
              >
                <Ionicons name="calendar" size={20} color="#fff" />
                <Text style={styles.optionText}>Fecha</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setModoPicker("inicio")}
              >
                <Ionicons name="time" size={20} color="#fff" />
                <Text style={styles.optionText}>Inicio</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => setModoPicker("fin")}
              >
                <Ionicons name="time-outline" size={20} color="#fff" />
                <Text style={styles.optionText}>Fin</Text>
              </TouchableOpacity>
            </View>

            {modoPicker && (
              <DateTimePicker
                value={
                  modoPicker === "fecha"
                    ? fecha
                    : modoPicker === "inicio"
                    ? horaInicio
                    : horaFin
                }
                mode={modoPicker === "fecha" ? "date" : "time"}
                is24Hour={true}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  if (!selectedDate) return;
                  if (modoPicker === "fecha") setFecha(selectedDate);
                  else if (modoPicker === "inicio") setHoraInicio(selectedDate);
                  else setHoraFin(selectedDate);
                  setModoPicker(null);
                }}
              />
            )}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.confirmar]}
                onPress={confirmarReserva}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelar]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Link href="/(tabs)" dismissTo style={styles.link}>
        <ThemedText type="link">Ir a la pantalla principal</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#122C34",
  },
  titulo: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 22,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#00AEEF",
    borderRadius: 12,
    padding: 12,
    marginVertical: 15,
    backgroundColor: "#f2f6f9",
    color: "#000",
    fontSize: 16,
  },
  lista: {
    marginTop: 10,
  },
  reservaItem: {
    padding: 15,
    borderRadius: 12,
    marginVertical: 8,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  disponible: {
    backgroundColor: "#27ea54",
  },
  ocupado: {
    backgroundColor: "#de414e",
  },
  casillero: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#fff",
  },
  estado: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 20,
  },
  modalBox: {
    backgroundColor: "#183E4B",
    borderRadius: 20,
    padding: 25,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  pickerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  optionButton: {
    flex: 1,
    backgroundColor: "#00AEEF",
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  optionText: {
    color: "#fff",
    marginTop: 5,
    fontWeight: "600",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  confirmar: {
    backgroundColor: "#27ea54",
  },
  cancelar: {
    backgroundColor: "#de414e",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    alignSelf: "center",
    marginTop: 20,
    paddingVertical: 15,
  },
});
