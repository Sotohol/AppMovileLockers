import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";

export default function PerfilInfoScreen() {
  // Datos simulados de usuario (puedes reemplazarlos con datos reales)
  const usuario = {
    nombreCompleto: "Luis Ángel Soto Contreras",
    nombreUsuario: "luis_soto",
    correo: "luis.soto@example.com",
    telefono: "+52 332-555-1234",
    contrasena: "********",
    fechaRegistro: "2024-03-15",
    fotoPerfil:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // puedes reemplazar con una URL real
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Información de tu perfil
      </ThemedText>

      <View style={styles.card}>
        {/* Imagen de perfil */}
        <Image source={{ uri: usuario.fotoPerfil }} style={styles.avatar} />

        {/* Datos personales */}
        <View style={styles.infoSection}>
          <Text style={styles.label}>👤 Nombre completo:</Text>
          <Text style={styles.value}>{usuario.nombreCompleto}</Text>

          <Text style={styles.label}>🆔 Nombre de usuario:</Text>
          <Text style={styles.value}>{usuario.nombreUsuario}</Text>

          <Text style={styles.label}>📧 Correo electrónico:</Text>
          <Text style={styles.value}>{usuario.correo}</Text>

          <Text style={styles.label}>📱 Teléfono:</Text>
          <Text style={styles.value}>{usuario.telefono}</Text>

          <Text style={styles.label}>🔒 Contraseña:</Text>
          <Text style={styles.value}>{usuario.contrasena}</Text>

          <Text style={styles.label}>📅 Fecha de registro:</Text>
          <Text style={styles.value}>{usuario.fechaRegistro}</Text>
        </View>

        {/* Botón para editar perfil */}
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.textoBoton}>✏️ Editar perfil</Text>
        </TouchableOpacity>
      </View>

      <Link href="/(tabs)/user" dismissTo style={styles.link}>
        <ThemedText type="link">Ir a la pantalla de usuario</ThemedText>
      </Link>
    </View>
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
    marginBottom: 20,
    color: "#fff",
  },
  card: {
    backgroundColor: "#d0e8ff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  infoSection: {
    alignSelf: "stretch",
  },
  label: {
    fontWeight: "bold",
    color: "#003366",
    marginTop: 8,
  },
  value: {
    color: "#333",
    marginBottom: 5,
  },
  boton: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    alignSelf: "center",
    marginTop: 25,
  },
});
