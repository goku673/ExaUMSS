import React from "react";
import { Surface } from "react-native-paper";
import { StyleSheet } from "react-native";

interface FormProps {
    children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({ children}) => (
        <Surface style={styles.container}>
            {children}
        </Surface>
     )


export default Form;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#FFFFFF",
        elevation: 4,
        borderRadius: 8,
    },
})

