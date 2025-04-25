import type React from "react"
import { Image, StyleSheet, View, Dimensions, Text } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")

const Banner: React.FC = () => (
  <View style={styles.container}>
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: "https://imgs.search.brave.com/y8KxH6rZQEz7n_N3V3MXlV2BVxx2WJp2m9zicHMpEcg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQzL01hcmNhX1Zl/cnRpY2FsX1VuaXZl/cnNpZGFkX01heW9y/X2RlX1Nhbl9TaW0l/QzMlQjNuX0NvY2hh/YmFtYmFfQm9saXZp/YS5wbmc",
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <LinearGradient
        colors={["rgba(255,255,255,0.7)", "rgba(255,255,255,0)"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.welcomeText}>Bienvenido a</Text>
      <Text style={styles.universityText}>Universidad Mayor de San Simón</Text>
    </View>
  </View>
)

export default Banner

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: width * 0.5,
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#f8f9ff",
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 16,
  },
  imageContainer: {
    width: "40%",
    height: "100%",
    position: "relative",
    backgroundColor: "#f0f4ff",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 40,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 4,
  },
  universityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1a56db",
  },
})
