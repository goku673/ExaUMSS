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
        <Text style={[styles.welcomeText, { color: isDark ? "#fff" : "#000" }]}>
          {t("welcome")} {/* "Bienvenido a" */}
        </Text>
        <Text style={[styles.universityText, { color: isDark ? "#fff" : "#000" }]}>
          {t("universityName")} {/* "Universidad Mayor de San Simón" */}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  imageContainer: {
    width: width * 0.9,
    height: 200,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  textContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "600",
  },
  universityText: {
    fontSize: 22,
    fontWeight: "bold",
  },
})

export default Banner
