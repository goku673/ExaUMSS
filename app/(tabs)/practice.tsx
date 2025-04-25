"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from "react-native"
import Text from "@/components/ui/Text"
import { MaterialCommunityIcons } from "@expo/vector-icons"
// refactorizar todo

const subjects = [
  { id: "1", name: "Cálculo" },
  { id: "2", name: "Álgebra" },
  { id: "3", name: "Biología" },
  { id: "4", name: "Historia" },
]

const exams = {
  Biología: [
    { id: "1", title: "Examen de Biología - 2022" },
    { id: "2", title: "Examen de Biología - 2021" },
  ],
  Cálculo: [
    { id: "1", title: "Examen de Cálculo - 2022" },
    { id: "2", title: "Examen de Cálculo - 2021" },
  ],
  Álgebra: [
    { id: "1", title: "Examen de Álgebra - 2022" },
    { id: "2", title: "Examen de Álgebra - 2021" },
  ],
  Historia: [
    { id: "1", title: "Examen de Historia - 2022" },
    { id: "2", title: "Examen de Historia - 2021" },
  ],
}

const PracticeScreen: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<keyof typeof exams | null>(null)
  const [searchText, setSearchText] = useState("")
  const [filteredSubjects, setFilteredSubjects] = useState(subjects)

  useEffect(() => {
    if (searchText) {
      const filtered = subjects.filter((subject) => subject.name.toLowerCase().includes(searchText.toLowerCase()))
      setFilteredSubjects(filtered)
    } else {
      setFilteredSubjects(subjects)
    }
  }, [searchText])

  const handleSubjectPress = (subject: keyof typeof exams) => {
    setSelectedSubject(subject)
  }

  const handleStartPractice = (examTitle: string) => {
    alert(`Empezando a practicar: ${examTitle}`)
  }

  const renderSubjectItem = ({ item }: { item: (typeof subjects)[0] }) => (
    <TouchableOpacity style={styles.subjectItem} onPress={() => handleSubjectPress(item.name as keyof typeof exams)}>
      <View style={styles.subjectIconContainer}>
        <MaterialCommunityIcons name="book-open-variant" size={24} color="#5B8FB9" />
      </View>
      <View style={styles.subjectContent}>
        <Text style={styles.subjectText}>{item.name}</Text>
        <Text style={styles.subjectExamCount}>
          {exams[item.name as keyof typeof exams]?.length || 0} exámenes disponibles
        </Text>
      </View>
    </TouchableOpacity>
  )

  const renderExamItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={styles.examItem}>
      <Text style={styles.examTitle}>{item.title}</Text>
      <TouchableOpacity style={styles.practiceButton} onPress={() => handleStartPractice(item.title)}>
        <Text style={styles.practiceButtonText}>Practicar</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      <View style={styles.container}>
        {selectedSubject ? (
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setSelectedSubject(null)} style={styles.backButton}>
                <MaterialCommunityIcons name="arrow-left" size={24} color="#5B8FB9" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Exámenes de {selectedSubject}</Text>
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
              <Text style={styles.mainTitle}>Prácticas</Text>
              <Text style={styles.subtitle}>Selecciona una materia para comenzar</Text>
            </View>

            <View style={styles.searchContainer}>
              <MaterialCommunityIcons name="magnify" size={20} color="#B8C4D0" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar materia..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#B8C4D0"
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
                <Text style={styles.noResultsText}>No se encontraron materias</Text>
              </View>
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
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
    color: "#303B4B",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6C7A8C",
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
    color: "#303B4B",
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#EEF2F6",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2F6",
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
    height: 50,
    borderWidth: 1,
    borderColor: "#E0E6ED",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#303B4B",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  subjectIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#EEF2F6",
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
    color: "#303B4B",
    marginBottom: 4,
  },
  subjectExamCount: {
    fontSize: 14,
    color: "#6C7A8C",
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
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#EEF2F6",
  },
  examTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#303B4B",
    flex: 1,
    marginRight: 12,
  },
  practiceButton: {
    backgroundColor: "#5B8FB9",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#5B8FB9",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  practiceButtonText: {
    color: "#FFFFFF",
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
    color: "#6C7A8C",
  },
})

export default PracticeScreen
