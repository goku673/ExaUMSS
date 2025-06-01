import type React from "react"
import { 
  View, 
  StyleSheet, 
  Text, 
  Animated, 
  Platform, 
  TouchableOpacity, 
  Image 
} from "react-native"
import { BlurView } from "expo-blur"
import { StatusBar } from "react-native"
import { useUser } from "@/context/UserContext"
import { useRouter } from "expo-router"

interface HeaderProps {
  height: number
  opacity: Animated.AnimatedInterpolation<string | number>
}

const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0
const PADDING_TOP = Platform.OS === "ios" ? 44 : STATUS_BAR_HEIGHT + 10

const Header: React.FC<HeaderProps> = ({ height, opacity }) => {
  const { user } = useUser()
  const router = useRouter()

  const profileImage =
    user?.profileImage && user.profileImage !== ""
      ? { uri: user.profileImage }
      : {
          uri: "https://imgs.search.brave.com/OmcQ-yOoPNpen6r311ItwwUjRzVH45Odple-LE6kQ3Y/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/dmVjdG9yLXByZW1p/dW0vaWNvbm8tbWVt/YnJlc2lhLXBsYXRl/YWRvLWljb25vLXBl/cmZpbC1hdmF0YXIt/ZGVmZWN0by1pY29u/by1taWVtYnJvcy1p/bWFnZW4tdXN1YXJp/by1yZWRlcy1zb2Np/YWxlcy1pbHVzdHJh/Y2lvbi12ZWN0b3Jp/YWxfNTYxMTU4LTQx/OTUuanBnP3NlbXQ9/YWlzX2h5YnJpZCZ3/PTc0MA",
        }

  return (
    <Animated.View style={[styles.headerContainer, { height, opacity }]}>
      <BlurView intensity={80} tint="light" style={styles.blurContainer}>
        <View style={[styles.container, { paddingTop: PADDING_TOP }]}>
          {/* Logo Section */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>Exa</Text>
            <Text style={styles.logoTextBold}>UMSS</Text>
          </View>

          {/* Profile Section */}
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile")}
            style={styles.profileButton}
            activeOpacity={0.7}
          >
            <Image source={profileImage} style={styles.profileImage} />
          </TouchableOpacity>
        </View>
      </BlurView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
  blurContainer: {
    flex: 1,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    flex: 1,
    minHeight: 80,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "300",
    color: "#2d3748",
    letterSpacing: -0.5,
  },
  logoTextBold: {
    fontSize: 24,
    fontWeight: "700",
    color: "#3182ce",
    letterSpacing: -0.5,
  },
  profileButton: {
    borderRadius: 22,
    overflow: "hidden",
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#e2e8f0",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
})

export default Header