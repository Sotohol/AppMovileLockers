import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';


export default function HomeScreen() {
 return (
 <ThemedView  style={[styles.background, { flex: 1 }]}>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerWrapper}>
          <Image
            source={require('@/assets/images/lockers_head.jpg')}
            style={styles.lockerHead}
          />
          <View style={styles.overlay} />
        </View>
      }


    >
     
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.whiteText}>¡Bienvenido!</ThemedText>
        <ThemedText type="title" style={styles.whiteText}>¿Qué deseas hacer?</ThemedText>
      </ThemedView>

      <ThemedView style={styles.contenedorPrincipalVistas}>
        <ThemedView style={styles.stepContainer}>
          <Link href="/modals/modalReserve">
            <Link.Trigger>
              <ThemedText type="title" style={styles.links}>Hacer una reserva</ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </Link.Trigger>
          </Link>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <Link href="/modals/modalVerify">
            <Link.Trigger>
              <ThemedText type="title" style={styles.links}>Ver reserva</ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </Link.Trigger>
          </Link>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <Link href="/modals/modalTax">
            <Link.Trigger>
              <ThemedText type="title" style={styles.links}>Tus multas</ThemedText>
              <Ionicons name="chevron-forward" size={24} color="#fff" />
            </Link.Trigger>
          </Link>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <Link href="/modals/modalReport">
            <Link.Trigger>
              <ThemedText type="title" style={styles.links}>Generar un reporte</ThemedText>
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

    flexGrow: 1,
    paddingBottom: 40,
  },
 headerWrapper: {
  position: "relative",
  width: "100%",
  height: 300,
  overflow: "hidden",
},
lockerHead: {
  width: "100%",
  height: "100%",
  resizeMode: "cover",
},
overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(39, 83, 97, 0.5)",

},
  whiteText: {
    color: "#fff",
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
    alignItems: 'flex-start',
    gap: 10,
  },
  titleContainer: {

    top: 15,
    bottom: 10,
    alignItems: 'center',
    gap: 10,
  },
  stepContainer: {
    padding: 10,
    bottom: 10,
    gap: 8,
    marginBottom: 20,
  
    borderRadius: 10,
    width: '100%',
  },
});
