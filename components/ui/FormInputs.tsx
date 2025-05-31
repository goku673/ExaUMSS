import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";

interface InputField {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  icon: string;
}

interface FormInputsProps {
  inputs: InputField[];
}

const FormInputs: React.FC<FormInputsProps> = ({ inputs }) => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  const styles = StyleSheet.create({
    container: {
      padding: 16,
    },
    input: {
      marginBottom: 16,
      backgroundColor: colors.inputBackground,
    },
  });

  return (
    <View style={styles.container}>
      {inputs.map((input, index) => (
        <TextInput
          key={index}
          label={input.label}
          value={input.value}
          onChangeText={input.onChangeText}
          secureTextEntry={input.secureTextEntry}
          mode="outlined"
          style={styles.input}
          right={<TextInput.Icon icon={input.icon} color={colors.text} />}
          theme={{
            colors: {
              text: colors.text,
              placeholder: colors.placeholder,
              primary: colors.primary,
              background: colors.inputBackground,
            },
          }}
        />
      ))}
    </View>
  );
};

export default FormInputs;
