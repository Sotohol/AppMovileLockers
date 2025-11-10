import { Image } from "expo-image";
import { StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.background}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <ThemedView style={styles.headerWrapper}>
            <Image
              source={require("@/assets/images/img_usuario.png")}
              style={styles.headerImage}
            />
            <ThemedView style={styles.overlay} />
          </ThemedView>
        }
      >
       
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.whiteText}>
          Usuario
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.contenedorPrincipalVistas}>
        <ThemedView style={styles.stepContainer}>
          <Link href="/modals/userModalAccount">
            <Link.Trigger>
              <ThemedText type="title" style={styles.links}>
                Información de perfil
              </ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </Link.Trigger>
          </Link>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <Link href="/modals/userModalEdit">
            <Link.Trigger>
              <ThemedText type="title" style={styles.links}>
                Editar perfil
              </ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </Link.Trigger>
          </Link>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <Link href="/modals/userModalSesion">
            <Link.Trigger>
              <ThemedText type="title" style={styles.links}>
                Sesión
              </ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </Link.Trigger>
          </Link>
        </ThemedView>
      </ThemedView>
      </ParallaxScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingBottom: 40,
  },
  headerWrapper: {
    position: "relative",
    height: 250,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  headerImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(39, 83, 97, 0.5)",
  },
  whiteText: {
    color: "#fff",
    fontWeight: "700",
  },
  links: {
    fontWeight: "700",
    fontSize: 20,
    color: "#fff",
  },
  contenedorPrincipalVistas: {
 
    top: 50,
    bottom: 10,
    padding: 30,
    alignItems: "flex-start",
    gap: 10,
  },
  titleContainer: {
  
    top: 15,
    bottom: 10,
    alignItems: "center",
    gap: 10,
  },
  stepContainer: {
    padding: 10,
    gap: 8,
    marginBottom: 20,
 
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
