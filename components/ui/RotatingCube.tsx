import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const RotatingCube = () => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true,
      })
    ).start();
  }, [rotateAnim]);

  const rotateY = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.scene}>
      <Animated.View
        style={[
          styles.cube,
          {
            transform: [
              { perspective: 600 },
              { rotateY },
            ],
          },
        ]}
      >
        <View style={[styles.cubeFace, styles.front]}>
          <Text style={styles.faceText}></Text>
        </View>
        <View style={[styles.cubeFace, styles.back]}>
          <Text style={styles.faceText}>ExaUMSS</Text>
        </View>
        <View style={[styles.cubeFace, styles.right]}>
          <Text style={styles.faceText}>ExaUMSS</Text>
        </View>
        <View style={[styles.cubeFace, styles.left]}>
          <Text style={styles.faceText}>ExaUMSS</Text>
        </View>
        <View style={[styles.cubeFace, styles.top]}>
          <Text style={styles.faceText}>ExaUMSS</Text>
        </View>
        <View style={[styles.cubeFace, styles.bottom]}>
          <Text style={styles.faceText}>ExaUMSS</Text>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  cube: {
    width: 200,
    height: 200,
    position: "absolute",
  },
  cubeFace: {
    position: "absolute",
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  faceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  front: {
    transform: [{ translateY: 0 }, { scale: 1.5 }], 
    backgroundColor: "rgba(255, 0, 0, 0.3)",
  },
  back: {
    transform: [{ rotateY: "180deg" }, { scale: 1.5 }],
    backgroundColor: "rgba(0, 0, 255, 0.3)",
  },
  right: {
    transform: [{ rotateY: "90deg" }, { scale: 1.5 }],
    backgroundColor: "rgba(0, 255, 0, 0.3)",
  },
  left: {
    transform: [{ rotateY: "-90deg" }, { scale: 1.5 }],
    backgroundColor: "rgba(255, 255, 0, 0.3)",
  },
  top: {
    transform: [{ rotateX: "90deg" }, { scale: 1.5 }],
    backgroundColor: "rgba(255, 0, 255, 0.3)",
  },
  bottom: {
    transform: [{ rotateX: "-90deg" }, { scale: 1.5 }],
    backgroundColor: "rgba(0, 255, 255, 0.3)",
  },
});

export default RotatingCube;