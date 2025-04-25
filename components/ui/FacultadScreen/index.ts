// import React from "react";
// import { View, StyleSheet } from "react-native";
// import Text from "../Text";
// import { useSearchParams } from "expo-router/build/hooks";

// const FacultadScreen: React.FC = () => {
//   const searchParams = useSearchParams(); // Obtiene los parámetros de la ruta
//   const facultad = searchParams.get("facultad"); // Usa .get() para obtener el valor del parámetro

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Facultad: {facultad}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#000",
//   },
// });

// export default FacultadScreen;