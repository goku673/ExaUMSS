"use client"

import type React from "react"
import { useRef } from "react"
import { StyleSheet, View, StatusBar, Animated, Platform, SafeAreaView } from "react-native"
import Header from "../Header";
import Title from "../Title"
import CardGrid from "../CardGrig";
import Banner from "../Banner";
import { LinearGradient } from "expo-linear-gradient"

const HEADER_HEIGHT = Platform.OS === "ios" ? 90 : 70
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 0

const HomeScreen: React.FC = () => {
  const scrollY = useRef(new Animated.Value(0)).current

  
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0.8, 1],
    extrapolate: "clamp",
  })

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

      <Header height={HEADER_HEIGHT} opacity={headerOpacity} />

      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        scrollEventThrottle={16}
      >
        <View style={styles.gradientContainer}>
          <LinearGradient colors={["#f0f4ff", "#ffffff"]} style={styles.gradient} />
        </View>
        <Banner />
        <View style={styles.contentWrapper}>
          
          <CardGrid />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
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
})

export default HomeScreen
