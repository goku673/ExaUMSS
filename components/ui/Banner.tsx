import React from "react"
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  Text,
  useColorScheme,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useTranslation } from "react-i18next"

const { width } = Dimensions.get("window")

const Banner: React.FC = () => {
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: isDark ? "#1f2937" : "#ffffff" }]}>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://imgs.search.brave.com/y8KxH6rZQEz7n_N3V3MXlV2BVxx2WJp2m9zicHMpEcg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy80/LzQzL01hcmNhX1Zl/cnRpY2FsX1VuaXZl/cnNpZGFkX01heW9y/X2RlX1Nhbl9TaW0l/QzMlQjNuX0NvY2hh/YmFtYmFfQm9saXZp/YS5wbmc",
            }}
            style={styles.image}
            resizeMode="contain"
          />
          <LinearGradient
            colors={[
              isDark 
                ? "rgba(31, 41, 55, 0.8)" 
                : "rgba(255, 255, 255, 0.8)",
              "transparent"
            ]}
            style={styles.gradient}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          />
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text style={[styles.welcomeText, { color: isDark ? "#e5e7eb" : "#6b7280" }]}>
              {t("Banner.Welcome")}
            </Text>
            <Text style={[styles.universityText, { color: isDark ? "#ffffff" : "#111827" }]}>
              {t("Banner.Major University of San Simón")}
            </Text>
          </View>
          
          <View style={styles.decorativeElements}>
            <View style={[styles.dot, { backgroundColor: "#1a56db" }]} />
            <View style={[styles.dot, { backgroundColor: "#3b82f6" }]} />
            <View style={[styles.dot, { backgroundColor: "#60a5fa" }]} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  contentContainer: {
    padding: 24,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  universityText: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 30,
    letterSpacing: -0.5,
  },
  decorativeElements: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
})

export default Banner