import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [isRegister, setIsRegister] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [fullName, setFullName] = useState("");

  const router = useRouter();

  const handleSubmit = () => {
    if (isRegister && !isAdminMode) {
      if (email && password && userName && studentCode && fullName) {
        alert("Registro exitoso ✅");
        router.replace("/(tabs)");
      } else {
        alert("Por favor completa todos los campos para crear tu cuenta.");
      }
    } else {
      if (email && password) {
        router.replace("/(admin)/admin_index");
      } else {
        alert("Por favor completa los campos de inicio de sesión.");
      }
    }
  };

  //Tienes que hacer que aparezca el layout en la parte baja de las ventana de admin

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
    <Text style={styles.appLogo}>Mi casillero</Text>
          <View style={styles.modeSelector}>
            <TouchableOpacity
              style={[styles.modeButton, !isAdminMode && styles.activeMode]}
              onPress={() => setIsAdminMode(false)}
            >
              <Text style={[styles.modeText, !isAdminMode && styles.activeText]}>Usuario</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeButton, isAdminMode && styles.activeMode]}
              onPress={() => setIsAdminMode(true)}
            >
              <Text style={[styles.modeText, isAdminMode && styles.activeText]}>Administrativo</Text>
            </TouchableOpacity>
          </View>


          <Text style={styles.title}>
            {isRegister && !isAdminMode ? "Crear Cuenta" : "Iniciar Sesión"}
          </Text>

          <TextInput
            style={styles.input}
            placeholder={isRegister ? "Correo" : "Correo o Usuario"}
            placeholderTextColor={DesignTokens.placeholderColor}
            value={email}
            onChangeText={setEmail}
            keyboardType={isRegister ? "email-address" : "default"}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor={DesignTokens.placeholderColor}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Solo se muestran estos campos si NO está en modo admin */}
          {!isAdminMode && isRegister && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                placeholderTextColor={DesignTokens.placeholderColor}
                value={fullName}
                onChangeText={setFullName}
              />
              <TextInput
                style={styles.input}
                placeholder="Usuario"
                placeholderTextColor={DesignTokens.placeholderColor}
                value={userName}
                onChangeText={setUserName}
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="Código de Alumno"
                placeholderTextColor={DesignTokens.placeholderColor}
                value={studentCode}
                onChangeText={setStudentCode}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Número de teléfono"
                placeholderTextColor={DesignTokens.placeholderColor}
                value={studentCode}
                onChangeText={setStudentCode}
                keyboardType="numeric"
              />
            </>
          )}

          <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isRegister && !isAdminMode ? "Registrar" : "Ingresar"}
            </Text>
          </TouchableOpacity>

          {!isAdminMode && (
            <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
              <Text style={styles.toggle}>
                {isRegister ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Crea una aquí"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Diseño base
const DesignTokens = {
  primaryColor: "#007AFF",
  secondaryColor: "#003366",
  backgroundColor: "#FFFFFF",
  inputBorderColor: "#CCCCCC",
  spacing: 20,
  borderRadius: 18,
  placeholderColor: "#999999",
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    padding: DesignTokens.spacing,
    marginHorizontal: DesignTokens.spacing / 2,
    gap: DesignTokens.spacing / 1.5,
  },
  appLogo: {
    fontSize: 32,
    fontWeight: "900",
    textAlign: "center",
    color: DesignTokens.primaryColor,
    marginBottom: DesignTokens.spacing * 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: DesignTokens.secondaryColor,
    marginBottom: DesignTokens.spacing / 2,
  },
  input: {
    borderWidth: 1,
    borderColor: DesignTokens.inputBorderColor,
    padding: 12,
    borderRadius: DesignTokens.borderRadius,
    fontSize: 16,
    color: DesignTokens.secondaryColor,
  },
  primaryButton: {
    backgroundColor: DesignTokens.primaryColor,
    padding: 15,
    borderRadius: DesignTokens.borderRadius,
    width: "35%",
    alignSelf: "center",
    alignItems: "center",
    marginTop: DesignTokens.spacing / 2,
  },
  buttonText: {
    color: DesignTokens.backgroundColor,
    fontWeight: "bold",
    fontSize: 18,
  },
  toggle: {
    marginTop: 0,
    textAlign: "center",
    color: DesignTokens.primaryColor,
    fontSize: 14,
  },
  // 🔹 Estilos del selector de modo
  modeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  modeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  activeMode: {
    borderColor: DesignTokens.primaryColor,
  },
  modeText: {
    fontSize: 16,
    color: "#999",
    fontWeight: "600",
  },
  activeText: {
    color: DesignTokens.primaryColor,
  },
});
