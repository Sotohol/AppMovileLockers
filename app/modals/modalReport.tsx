import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Link } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReporteScreen() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleReport = () => {
    if (!titulo || !descripcion) {
      Alert.alert("⚠️ Campos incompletos", "Por favor llena todos los campos.");
      return;
    }

    Alert.alert("✅ Reporte enviado", `Motivo: ${titulo}\nDescripción: ${descripcion}`);
    setTitulo("");
    setDescripcion("");
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Reportar un mal uso
      </ThemedText>

      <View style={styles.card}>
        {/* Ícono ilustrativo */}
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/595/595067.png",
          }}
          style={styles.icon}
        />

        <ThemedText style={styles.textoIntro}>
          Si notas un comportamiento inadecuado o uso indebido del sistema,
          ayúdanos reportándolo. Todos los reportes son revisados.
        </ThemedText>

        {/* Campo de título */}
        <TextInput
          style={styles.input}
          placeholder="Motivo del reporte"
          value={titulo}
          onChangeText={setTitulo}
          placeholderTextColor="#666"
        />

        {/* Campo de descripción */}
        <TextInput
          style={[styles.input, styles.textarea]}
          placeholder="Describe brevemente el problema..."
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
          placeholderTextColor="#666"
        />

        {/* Botón principal */}
        <TouchableOpacity style={styles.boton} onPress={handleReport}>
          <ThemedText style={styles.botonTexto}>🚨 Enviar Reporte</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Link de regreso */}
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
    backgroundColor: "#1D3D47",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#d0e8ff",
    padding: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 70,
    height: 70,
    alignSelf: "center",
    marginBottom: 15,
  },
  textoIntro: {
    color: "#003366",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginVertical: 8,
    borderColor: "#a3c8f0",
    borderWidth: 1,
  },
  textarea: {
    height: 100,
    textAlignVertical: "top",
  },
  boton: {
    marginTop: 15,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    alignSelf: "center",
    marginTop: 25,
  },
});
