import type React from "react"
import { View, StyleSheet, Text, Animated, Platform } from "react-native"
import { BlurView } from "expo-blur"
import IconButton from "./IconButton"
import { StatusBar } from "react-native"

interface HeaderProps {
  height: number
  opacity: Animated.AnimatedInterpolation<string | number>
}

const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0
const PADDING_TOP = Platform.OS === "ios" ? 0 : STATUS_BAR_HEIGHT

const Header: React.FC<HeaderProps> = ({ height, opacity }) => (
  <Animated.View style={[styles.headerContainer, { height, opacity }]}>
    <BlurView intensity={80} tint="light" style={styles.blurContainer}>
      <View style={[styles.container, { paddingTop: PADDING_TOP }]}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Exa</Text>
          <Text style={styles.logoTextBold}>UMSS</Text>
        </View>

        <View style={styles.iconsContainer}>
          <IconButton icon="magnify" onPress={() => console.log("Search pressed")} style={styles.iconButton} />
          <IconButton icon="account-circle" onPress={() => console.log("Profile pressed")} style={styles.iconButton} />
        </View>
      </View>
    </BlurView>
  </Animated.View>
)

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  blurContainer: {
    flex: 1,
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    flex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#333",
  },
  logoTextBold: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1a56db",
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 8,
  },
})

export default Header
