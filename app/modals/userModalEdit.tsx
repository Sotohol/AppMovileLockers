import { Link } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";

export default function EditarPerfilScreen() {
  // Datos iniciales del usuario (puedes traerlos de tu base de datos o contexto)
  const [usuario, setUsuario] = useState({
    nombreCompleto: "Luis Ángel Soto Contreras",
    nombreUsuario: "luis_soto",
    correo: "luis.soto@example.com",
    telefono: "+52 332-555-1234",
    contrasena: "********",
    fotoPerfil:
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  });

  const handleChange = (campo, valor) => {
    setUsuario({ ...usuario, [campo]: valor });
  };

  const handleGuardar = () => {
    alert("✅ Cambios guardados correctamente");
    // Aquí podrías enviar los datos a tu backend o base de datos
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Editar tu perfil
      </ThemedText>

      <View style={styles.card}>
        {/* Imagen de perfil */}
        <Image source={{ uri: usuario.fotoPerfil }} style={styles.avatar} />

        <TouchableOpacity style={styles.botonSecundario}>
          <Text style={styles.textoBotonSecundario}>📸 Cambiar foto</Text>
        </TouchableOpacity>

        {/* Campos editables */}
        <Text style={styles.label}>👤 Nombre completo</Text>
        <TextInput
          style={styles.input}
          value={usuario.nombreCompleto}
          onChangeText={(t) => handleChange("nombreCompleto", t)}
        />

        <Text style={styles.label}>🆔 Nombre de usuario</Text>
        <TextInput
          style={styles.input}
          value={usuario.nombreUsuario}
          onChangeText={(t) => handleChange("nombreUsuario", t)}
        />

        <Text style={styles.label}>📧 Correo electrónico</Text>
        <TextInput
          style={styles.input}
          value={usuario.correo}
          onChangeText={(t) => handleChange("correo", t)}
          keyboardType="email-address"
        />

        <Text style={styles.label}>📱 Teléfono</Text>
        <TextInput
          style={styles.input}
          value={usuario.telefono}
          onChangeText={(t) => handleChange("telefono", t)}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>🔒 Contraseña</Text>
        <TextInput
          style={styles.input}
          value={usuario.contrasena}
          onChangeText={(t) => handleChange("contrasena", t)}
          secureTextEntry
        />

        {/* Botón para guardar */}
        <TouchableOpacity style={styles.botonPrincipal} onPress={handleGuardar}>
          <Text style={styles.textoBotonPrincipal}>💾 Guardar cambios</Text>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    color: "#003366",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 5,
  },
  botonPrincipal: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBotonPrincipal: {
    color: "#fff",
    fontWeight: "bold",
  },
  botonSecundario: {
    backgroundColor: "#80bfff",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
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
