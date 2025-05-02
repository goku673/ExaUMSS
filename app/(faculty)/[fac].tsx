import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { IconButton } from "react-native-paper";
import Text from "@/components/ui/Text";
import FacultyMaterials from "@/components/ui/FacultyMaterials";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";

const FacultyScreen: React.FC = () => {
  const { fac } = useLocalSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t } = useTranslation();

  // Memoized styles
  const styles = React.useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    backButton: {
      position: "absolute",
      top: 16,
      left: 16,
      zIndex: 10,
      backgroundColor: colors.cardBackground,
      borderRadius: 20,
      marginRight: 8,
      elevation: 2,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === "Oscuro" ? 0.2 : 0.1,
      shadowRadius: 4,
    },
    header: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: colors.text,
      marginTop: 48,
      marginBottom: 24,
      paddingHorizontal: 24,
    },
    contentContainer: {
      flex: 1,
      paddingHorizontal: 16,
    },
  }), [colors, theme]);

  const facultyName = React.useMemo(() => {
    if (!fac) return t('[fac].unknown');
    return Array.isArray(fac) ? fac[0] : fac;
  }, [fac, t]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => router.back()}
          style={styles.backButton}
          iconColor={colors.primary}
        />
        
        <View style={styles.headerContainer}>
          <Text style={styles.header}>
            {t('[fac].entranceExamsFor', { faculty: facultyName })}
          </Text>
        </View>

        //agregar
      </View>
    </SafeAreaView>
  );
};

export default FacultyScreen;
/*
<View style={styles.contentContainer}>
          <FacultyMaterials faculty={facultyName} />
        </View>
*/