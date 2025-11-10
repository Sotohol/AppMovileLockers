import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";

export default function SesionScreen() {
  // Datos simulados de actividad de sesión (puedes reemplazarlos con datos reales)
  const sesion = {
    ultimaSesion: "2025-10-25 21:43",
    dispositivo: "Samsung Galaxy S22",
    ubicacion: "Guadalajara, México",
    estado: "Activa",
  };

  const handleCerrarSesion = () => {
    alert("👋 Has cerrado sesión correctamente");
    // Aquí puedes implementar la lógica real de cierre de sesión
  };

  const handleCambiarContrasena = () => {
    alert("🔒 Redirigiendo a cambiar contraseña...");
    // Aquí podrías navegar a otra pantalla o abrir un formulario modal
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Actividad de sesión
      </ThemedText>

      <View style={styles.card}>
        <Text style={styles.label}>🕓 Último acceso:</Text>
        <Text style={styles.value}>{sesion.ultimaSesion}</Text>

        <Text style={styles.label}>📱 Dispositivo:</Text>
        <Text style={styles.value}>{sesion.dispositivo}</Text>

        <Text style={styles.label}>📍 Ubicación:</Text>
        <Text style={styles.value}>{sesion.ubicacion}</Text>

        <Text style={styles.label}>⚡ Estado:</Text>
        <Text
          style={[
            styles.value,
            sesion.estado === "Activa" ? styles.activa : styles.inactiva,
          ]}
        >
          {sesion.estado}
        </Text>

        {/* Botones de acción */}
        <TouchableOpacity
          style={[styles.boton, styles.botonPrincipal]}
          onPress={handleCerrarSesion}
        >
          <Text style={styles.textoBotonPrincipal}>🚪 Cerrar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, styles.botonSecundario]}
          onPress={handleCambiarContrasena}
        >
          <Text style={styles.textoBotonSecundario}>🔑 Cambiar contraseña</Text>
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
  },
  label: {
    fontWeight: "bold",
    color: "#003366",
    marginTop: 10,
  },
  value: {
    color: "#333",
    marginBottom: 5,
  },
  activa: { color: "green" },
  inactiva: { color: "red" },
  boton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  botonPrincipal: {
    backgroundColor: "#007bff",
  },
  textoBotonPrincipal: {
    color: "#fff",
    fontWeight: "bold",
  },
  botonSecundario: {
    backgroundColor: "#80bfff",
  },
  textoBotonSecundario: {
    color: "#003366",
    fontWeight: "bold",
  },
  link: {
    alignSelf: "center",
    marginTop: 25,
  },
});
