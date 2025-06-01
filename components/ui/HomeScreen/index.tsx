"use client"

import type React from "react"
import { useRef } from "react"
import { StyleSheet, View, StatusBar, Animated, Platform, SafeAreaView } from "react-native"
import Header from "../Header";
import Title from "../Title"
import CardGrid from "../CardGrig";
import Banner from "../Banner";
import { LinearGradient } from "expo-linear-gradient"
import { useTheme } from "@/components/ui/ThemeContext"
import { getThemeColors } from "@/components/theme"
import { useTranslation } from "react-i18next"

const HEADER_HEIGHT = Platform.OS === "ios" ? 90 : 70
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0

const HomeScreen: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current
  const { theme } = useTheme()
  const colors = getThemeColors(theme)
  const { t } = useTranslation()

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0.8, 1],
    extrapolate: "clamp",
  })

  const dynamicStyles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      marginTop: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
    },
    contentContainer: {
      paddingBottom: 24,
    },
    contentWrapper: {
      paddingHorizontal: 16,
    },
    gradientContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 300,
    },
    gradient: {
      height: "100%",
      width: "100%",
    },
    banner: {
      marginTop: 25,
      
    }
  })

  const gradientColors: [string, string, ...string[]] = theme === "Claro" 
  ? [colors.bannerImageBackground, colors.background] 
  : [colors.bannerBackground, colors.background];

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <StatusBar barStyle={theme === "Claro" ? "dark-content" : "light-content"} 
                backgroundColor="transparent" 
                translucent />

      <Header height={HEADER_HEIGHT} opacity={headerOpacity} />

      <Animated.ScrollView
        style={dynamicStyles.container}
        contentContainerStyle={dynamicStyles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { 
          useNativeDriver: false 
        })}
        scrollEventThrottle={16}
      >
        <View style={dynamicStyles.gradientContainer}>
          <LinearGradient 
            colors={gradientColors} 
            style={dynamicStyles.gradient} 
          />
        </View>
        <View style={dynamicStyles.banner}>
          <Banner />
        </View>
        
        <View style={dynamicStyles.contentWrapper}>
          <CardGrid />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen