import { useLocalSearchParams } from "expo-router";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import images from "../../../assets/images";

export default function FacultyContent() {
  const { title } = useLocalSearchParams<{
    title: string;
    image: any;
  }>();

  const getFacultyBackground = () => {
    switch(title) {
      case 'Faculty of Medicine':
        return images.facMedicine;
      case 'Faculty of Law':
        return images.facLaw;
      case 'Faculty of Economics':
        return images.facEconomy;
      case 'Faculty of Engineering':
        return images.facTecno;
      default:
        return images.facMedicine;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={getFacultyBackground()}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Encabezado con título en fondo azul */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}> {title} </Text>
          </View>
          <Text style={styles.subtitle}>
            Bienvenido a la {title}, aquí encontrarás exámenes pasados
          </Text>
        </View>

        {/* Contenido semi-transparente */}
        <View style={styles.contentOverlay}>
          {/* añadiremos los archivos aca */}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  header: {
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 15,
    margin: 5,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  titleContainer: {
    backgroundColor: '#2E86C1',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  contentOverlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    margin: 5,
    borderRadius: 24,
    padding: 20,
  },
});

