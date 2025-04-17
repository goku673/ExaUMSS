import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "./Card";

const CardGrid: React.FC = () => {
  return (
    <View style={styles.container}>
      <Card
        title="Faculty"
        description="Access faculty resources"
        image="https://via.placeholder.com/50"
      />
      <Card
        title="Recent"
        description="View your recent exams"
        image="https://via.placeholder.com/50"
      />
      <Card
        title="Guide"
        description="Read the user guide"
        image="https://via.placeholder.com/50"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
});

export default CardGrid;