import { useLocalSearchParams } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

export default function FacultyDetails() {
  const { title } = useLocalSearchParams<{
    title: string;
    image: any;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Facultad {title}</Text>
      <Text style={styles.message}>
        Welcome to {title}. Here you will find past exams.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 26,
  },
});