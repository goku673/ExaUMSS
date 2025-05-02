"use client"

import React, { useState, useEffect, useMemo } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from "react-native";
import Text from "@/components/ui/Text";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";

type Subject = {
  id: string;
  key: string;
};

type Exam = {
  id: string;
  title: string;
};

type ExamData = {
  [key: string]: Exam[];
};

const PracticeScreen: React.FC = () => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t } = useTranslation();
  
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);

  // Subjects data with translations
  const subjects = useMemo(() => [
    { id: "1", key: "Calculus" },
    { id: "2", key: "Algebra" },
    { id: "3", key: "Biology" },
    { id: "4", key: "History" },
  ], []);

  // Exams data with translations
  const exams = useMemo<ExamData>(() => ({
    Biology: [
      { id: "1", title: t('practice.biologyExam2022') },
      { id: "2", title: t('practice.biologyExam2021') },
    ],
    Calculus: [
      { id: "1", title: t('practice.calculusExam2022') },
      { id: "2", title: t('practice.calculusExam2021') },
    ],
    Algebra: [
      { id: "1", title: t('practice.algebraExam2022') },
      { id: "2", title: t('practice.algebraExam2021') },
    ],
    History: [
      { id: "1", title: t('practice.historyExam2022') },
      { id: "2", title: t('practice.historyExam2021') },
    ],
  }), [t]);

  // Filter subjects based on search text
  useEffect(() => {
    const filtered = subjects.filter(subject =>
      t(subject.key).toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSubjects(filtered);
  }, [searchText, subjects, t]);

  const handleSubjectPress = (subjectKey: string) => {
    setSelectedSubject(subjectKey);
  };

  const handleStartPractice = (examTitle: string) => {
    alert(`${t('practice.startingPractice')}: ${examTitle}`);
  };

  const handleBack = () => {
    setSelectedSubject(null);
  };

  const renderSubjectItem = ({ item }: { item: Subject }) => (
    <TouchableOpacity
      style={[styles.subjectItem, { 
        backgroundColor: colors.cardBackground, 
        borderColor: colors.border 
      }]}
      onPress={() => handleSubjectPress(item.key)}
    >
      <View style={[
        styles.subjectIconContainer, 
        { backgroundColor: colors.iconBackground }
      ]}>
        <MaterialCommunityIcons 
          name="book-open-variant" 
          size={24} 
          color={colors.primary} 
        />
      </View>
      <View style={styles.subjectContent}>
        <Text style={[styles.subjectText, { color: colors.text }]}>
          {t(item.key)}
        </Text>
        <Text style={[styles.subjectExamCount, { color: colors.textSecondary }]}>
          {exams[item.key]?.length || 0} {t('practice.examsAvailable')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderExamItem = ({ item }: { item: Exam }) => (
    <View style={[
      styles.examItem, 
      { 
        backgroundColor: colors.cardBackground, 
        borderColor: colors.border 
      }
    ]}>
      <Text style={[styles.examTitle, { color: colors.text }]}>{item.title}</Text>
      <TouchableOpacity 
        style={[
          styles.practiceButton, 
          { backgroundColor: colors.primary }
        ]} 
        onPress={() => handleStartPractice(item.title)}
      >
        <Text style={styles.practiceButtonText}>{t('practice.practice')}</Text>
      </TouchableOpacity>
    </View>
  );

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      padding: 16,
    },
    titleContainer: {
      marginBottom: 24,
    },
    mainTitle: {
      fontSize: 28,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      textAlign: "center",
      flex: 1,
    },
    backButton: {
      padding: 8,
      borderRadius: 8,
    },
    searchContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.inputBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      marginBottom: 20,
      height: 50,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchIcon: {
      marginRight: 10,
      color: colors.icon,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
      height: "100%",
    },
    subjectList: {
      paddingBottom: 20,
    },
    subjectItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      marginBottom: 12,
      borderRadius: 12,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === "Oscuro" ? 0.1 : 0.05,
      shadowRadius: 8,
      elevation: 2,
      borderWidth: 1,
    },
    subjectIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    subjectContent: {
      flex: 1,
    },
    subjectText: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 4,
    },
    subjectExamCount: {
      fontSize: 14,
    },
    examList: {
      paddingBottom: 20,
    },
    examItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 16,
      marginBottom: 12,
      borderRadius: 12,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: theme === "Oscuro" ? 0.1 : 0.05,
      shadowRadius: 8,
      elevation: 2,
      borderWidth: 1,
    },
    examTitle: {
      fontSize: 16,
      fontWeight: "500",
      flex: 1,
      marginRight: 12,
    },
    practiceButton: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 10,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    practiceButtonText: {
      color: colors.buttonText,
      fontSize: 14,
      fontWeight: "600",
    },
    noResultsContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    noResultsText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar 
        barStyle={theme === "Oscuro" ? "light-content" : "dark-content"} 
        backgroundColor={colors.background} 
      />
      
      <View style={styles.container}>
        {selectedSubject ? (
          <>
            <View style={styles.header}>
              <TouchableOpacity 
                onPress={handleBack} 
                style={[styles.backButton, { backgroundColor: colors.primaryLight }]}
              >
                <MaterialCommunityIcons 
                  name="arrow-left" 
                  size={24} 
                  color={colors.primary} 
                />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {t('practice.examsOf')} {t(selectedSubject)}
              </Text>
              <View style={{ width: 24 }} />
            </View>

            <FlatList
              data={exams[selectedSubject] || []}
              keyExtractor={(item) => item.id}
              renderItem={renderExamItem}
              contentContainerStyle={styles.examList}
              showsVerticalScrollIndicator={false}
            />
          </>
        ) : (
          <>
            <View style={styles.titleContainer}>
              <Text style={styles.mainTitle}>{t('practice.practice')}</Text>
              <Text style={styles.subtitle}>
                {t('practice.selectSubjectToStart')}
              </Text>
            </View>

            <View style={styles.searchContainer}>
              <MaterialCommunityIcons 
                name="magnify" 
                size={20} 
                color={colors.icon} 
                style={styles.searchIcon} 
              />
              <TextInput
                style={styles.searchInput}
                placeholder={t('practice.searchSubject')}
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor={colors.placeholder}
              />
            </View>

            {filteredSubjects.length > 0 ? (
              <FlatList
                data={filteredSubjects}
                keyExtractor={(item) => item.id}
                renderItem={renderSubjectItem}
                contentContainerStyle={styles.subjectList}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  {t('practice.noSubjectsFound')}
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PracticeScreen;