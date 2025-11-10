import { ThemedText } from "@/components/themed-text";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ReservasScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  // Simulación de una única reserva (puedes reemplazar por datos reales de BD)
  const reserva = {
    id: "1",
    titulo: "A-101",
    fecha: "2025-10-04",
    horaInicio: "14:00",
    horaFin: "15:30",
    estado: "Confirmada",
  };

  // Solicitar permiso de cámara
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    Alert.alert("✅ Código detectado", `Código: ${data}`);
  };

  const handleOpenScanner = () => {
    if (hasPermission === null) {
      Alert.alert("Permiso", "Solicitando acceso a la cámara...");
      return;
    }
    if (hasPermission === false) {
      Alert.alert("Error", "No se concedió permiso para usar la cámara.");
      return;
    }
    setScanned(false);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Detalles de tu reserva</ThemedText>

      {/* Ficha única */}
      <View style={styles.card}>
        <Text style={styles.titulo}>{reserva.titulo}</Text>
        <Text style={styles.texto}>📅 {reserva.fecha}</Text>
        <Text style={styles.texto}>
          🕒 {reserva.horaInicio} - {reserva.horaFin}
        </Text>
        <Text
          style={[
            styles.estado,
            reserva.estado === "Confirmada" && styles.confirmada,
            reserva.estado === "Pendiente" && styles.pendiente,
            reserva.estado === "Cancelada" && styles.cancelada,
            reserva.estado === "Expiró" && styles.expiro,
          ]}
        >
          {reserva.estado}
        </Text>

        {/* Advertencia de multa */}
        <Text style={styles.advertencia}>
          ⚠️ Multa de $10 por cada 20 min excedidos del horario.
        </Text>

        {/* Botón QR */}
        <TouchableOpacity style={styles.botonQR} onPress={handleOpenScanner}>
          <Text style={styles.textoQR}>📷 Verificar con QR</Text>
        </TouchableOpacity>

        {/* Escáner QR */}
        {!scanned && hasPermission && (
          <View style={styles.scannerContainer}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={styles.scanner}
            />
          </View>
        )}
      </View>

      <Link href="/(tabs)" dismissTo style={styles.link}>
        <ThemedText type="link">Ir a la pantalla principal</ThemedText>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#1D3D47",
    justifyContent: "space-between",
  },
  link: {
    alignSelf: "center",
    marginTop: 15,
    paddingVertical: 15,
  },
  card: {
    backgroundColor: "#d0e8ff",
    padding: 20,
    borderRadius: 10,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#003366",
  },
  texto: {
    color: "#333",
    marginTop: 5,
  },
  estado: {
    marginTop: 10,
    fontWeight: "bold",
  },
  confirmada: { color: "green" },
  pendiente: { color: "orange" },
  cancelada: { color: "red" },
  expiro: { color: "grey" },
  advertencia: {
    marginTop: 15,
    color: "red",
    fontWeight: "600",
  },
  botonQR: {
    marginTop: 20,
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textoQR: {
    color: "#fff",
    fontWeight: "bold",
  },
  scannerContainer: {
    marginTop: 20,
    height: 200,
    overflow: "hidden",
    borderRadius: 10,
  },
  scanner: {
    flex: 1,
  },
});

