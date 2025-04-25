// components/ui/GuidesScreen.tsx

import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Header from "../Header";
import Title from "../Title";

const GuidesScreen = () => {
  const guidesData = [
    {
      id: "1",
      section: "Quick Tips",
      title: "What are the subjects in the UMSS entrance exam?",
      details: "The subjects are: Mathematics, Physics, Chemistry and Biology.",
      progress: 10,
    },
    {
      id: "2",
      section: "Quick Tips",
      title: "How long does it take to study for the UMSS entrance exam?",
      details: "It depends on your existing knowledge. Most people need 2–3 months.",
      progress: 20,
    },
    {
      id: "3",
      section: "Trivia",
      title: "UMSS is a public university in Bolivia",
      details: "",
      progress: 30,
    },
    {
      id: "4",
      section: "Trivia",
      title: "How many students apply to UMSS each year?",
      details: "Approximately 70,000 students apply each year.",
      progress: 40,
    },
  ];

  const router = useRouter();

  const renderItem = ({ item, index }: any) => {
    const showHeader =
      index === 0 || item.section !== guidesData[index - 1].section;

    return (
      <View>
        {showHeader && <Text style={styles.section}>{item.section}</Text>}
        <View style={styles.card}>
          <View style={{ flex: 1 }}>
            <Text style={styles.question}>{item.title}</Text>
            {item.details !== "" && (
              <Text style={styles.description}>{item.details}</Text>
            )}
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${item.progress}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>{item.progress}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Guides</Text>
      </View>

      <Image
        source={{ uri: "https://img.freepik.com/vector-premium/chica-estudia-libros-sentada-escritorio-habitacion-ilustracion-dibujos-animados_101884-969.jpg" }}
        style={styles.image}
        resizeMode="contain"
      />

      <FlatList
        data={guidesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
  },
  back: {
    fontSize: 24,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    width: "100%",
    height: 180,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  section: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  question: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: "#7f8c8d",
  },
  progressContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 12,
    width: 40,
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#d0d0d0",
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: 4,
    backgroundColor: "#3498db",
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: "#444",
  },
});

export default GuidesScreen;