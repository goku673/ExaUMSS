import React from "react";
import {
    SectionList,
    TouchableOpacity,
    StyleSheet,
    View,
    Text as RNText,
    Alert,
    Image,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { images } from "@/assets/images";

// Datos de ejemplo con PDFs
const pdfMaterials = [
    {
        title: "2022",
        data: [
            {
                title: "UMSS 2022 Entrance Exam - Mathematics",
                url: "https://example.com/matematicas2022.pdf",
                size: "12MB",
            },
            {
                title: "UMSS 2022 Entrance Exam - Physics",
                url: "https://example.com/fisica2022.pdf",
                size: "15MB",
            },
        ],
    },
    {
        title: "2021",
        data: [
            {
                title: "UMSS 2021 Entrance Exam - Chemistry",
                url: "https://example.com/quimica2021.pdf",
                size: "18MB",
            },
            {
                title: "UMSS 2021 Entrance Exam - Biology",
                url: "https://example.com/biologia2021.pdf",
                size: "20MB",
            },
        ],
    },
];

const FacultyMaterials: React.FC = () => {
    const handlePdfPress = async (pdf: { title: string; url: string }) => {
        try {
            const fileName = pdf.title.replace(/\s/g, "_") + ".pdf";
            const localUri = FileSystem.cacheDirectory + fileName;
            const fileInfo = await FileSystem.getInfoAsync(localUri);

            if (!fileInfo.exists) {
                await FileSystem.downloadAsync(pdf.url, localUri);
            }
            if (!(await Sharing.isAvailableAsync())) {
                Alert.alert("PDF descargado", `Archivo guardado en: ${localUri}`);
            } else {
                await Sharing.shareAsync(localUri);
            }
        } catch (error) {
            console.error("Error al descargar o compartir el PDF:", error);
            Alert.alert("Error", "No se pudo descargar o abrir el PDF");
        }
    };

    return (
        <View style={styles.container}>
            <SectionList
                sections={pdfMaterials}
                keyExtractor={(item, index) => item.title + index}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <View style={styles.itemInfo}>
                            <Image
                                source={images.pdfIcon}
                                style={styles.icon}
                            />
                            <View>
                                <RNText style={styles.itemTitle}>{item.title}</RNText>
                                <RNText style={styles.itemSubtitle}>PDF • {item.size}</RNText>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => handlePdfPress(item)}
                            style={styles.downloadButton}
                        >
                            <RNText style={styles.downloadButtonText}>Download</RNText>
                        </TouchableOpacity>
                    </View>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <RNText style={styles.headerText}>{title}</RNText>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
        padding: 8,
        marginBottom: 8,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    itemInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    itemSubtitle: {
        fontSize: 14,
        color: "#666",
    },
    downloadButton: {
        backgroundColor: "#007BFF",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 4,
    },
    downloadButtonText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "bold",
    },
});

export default FacultyMaterials;