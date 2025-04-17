import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Header from "../Header";
import Banner from "../Banner";
import Title from "../Title";
import CardGrid from "../CardGrig";

const HomeScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <Banner />
      <Title style={{backgroundColor: "#F5F5DC"}}>UMSS Centralized</Title>
      <CardGrid />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
});

export default HomeScreen;