import { Link } from "expo-router";
import { FlatList, StyleSheet, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// Datos de BD
const multas = [
  { id: "1", motivo: "No asistió a la reserva", fecha: "2025-09-20", estado: "Pendiente" },
  { id: "2", motivo: "Daño en el equipo", fecha: "2025-09-22", estado: "Pagada" },
  { id: "3", motivo: "Entrega fuera de horario", fecha: "2025-09-25", estado: "Pendiente" },
];

const renderMulta = ({ item }) => (
  <View style={styles.multaItem}>
    <ThemedText style={styles.motivo}>{item.motivo}</ThemedText>
    <ThemedText style={styles.texto}>📅 {item.fecha}</ThemedText>
    <ThemedText
      style={[
        styles.estado,
        item.estado === "Pendiente" && styles.pendiente,
        item.estado === "Pagada" && styles.pagada,
      ]}
    >
      {item.estado}
    </ThemedText>
  </View>
);

export default function MultasScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.header}>
        Actividad de multas
      </ThemedText>

   
      <FlatList
        data={multas}
        keyExtractor={(item) => item.id}
        renderItem={renderMulta}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <Link href="/(tabs)" dismissTo style={styles.link}>
        <ThemedText type="link">Ir a la pantalla principal</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D3D47",
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  header: {
    color: "#fff",
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 20,
    width: "100%",
  },
  multaItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 30,
    marginVertical: 10,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  motivo: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#003366",
    marginBottom: 5,
  },
  texto: {
    color: "#333",
    fontSize: 15,
  },
  estado: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 15,
  },
  pendiente: {
    color: "#d32f2f",
  },
  pagada: {
    color: "green",
  },
  link: {
    marginTop: 20,
    paddingVertical: 15,
    alignSelf: "center",
  },
});
