import React, { useState } from "react";
import { SectionList, TouchableOpacity, StyleSheet, View, Image, ActivityIndicator } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { images } from "@/assets/images";
import { useTheme } from "@/components/ui/ThemeContext";
import { getThemeColors } from "@/components/theme";
import { useTranslation } from "react-i18next";
import Text from "@/components/ui/Text";

interface PdfMaterial {
  title: string;
  url: string;
  size: string;
}

interface PdfSection {
  title: string;
  data: PdfMaterial[];
}

const FacultyMaterials: React.FC = () => {
  const { theme } = useTheme();
  const colors = getThemeColors(theme);
  const { t } = useTranslation();
  const [downloading, setDownloading] = useState<Record<string, boolean>>({});

  const pdfMaterials: PdfSection[] = [
    {
      title: "2022",
      data: [
        {
          title: t('materials.mathExam2022'),
          url: "https://example.com/matematicas2022.pdf",
          size: "12MB",
        },
        {
          title: t('materials.physicsExam2022'),
          url: "https://example.com/fisica2022.pdf",
          size: "15MB",
        },
      ],
    },
    {
      title: "2021",
      data: [
        {
          title: t('materials.chemistryExam2021'),
          url: "https://example.com/quimica2021.pdf",
          size: "18MB",
        },
        {
          title: t('materials.biologyExam2021'),
          url: "https://example.com/biologia2021.pdf",
          size: "20MB",
        },
      ],
    },
  ];

  const handlePdfPress = async (pdf: PdfMaterial) => {
    try {
      setDownloading(prev => ({ ...prev, [pdf.url]: true }));
      
      const fileName = pdf.title.replace(/\s/g, "_") + ".pdf";
      const localUri = FileSystem.cacheDirectory + fileName;
      const fileInfo = await FileSystem.getInfoAsync(localUri);

      if (!fileInfo.exists) {
        const downloadResumable = FileSystem.createDownloadResumable(
          pdf.url,
          localUri,
          {},
          (downloadProgress) => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            console.log(`Download progress: ${progress * 100}%`);
          }
        );

        await downloadResumable.downloadAsync();
      }
      if (!(await Sharing.isAvailableAsync())) {
      } else {
        await Sharing.shareAsync(localUri);
      }
    } catch (error) {
      console.error("PDF download error:", error);
    } finally {
      setDownloading(prev => ({ ...prev, [pdf.url]: false }));
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingHorizontal: 16,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: colors.sectionHeaderBackground || colors.primaryLight,
      marginTop: 8,
      borderRadius: 8,
    },
    itemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
      paddingHorizontal: 16,
      backgroundColor: colors.cardBackground,
      borderRadius: 8,
      marginVertical: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    itemInfo: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      marginRight: 12,
    },
    icon: {
      width: 40,
      height: 40,
      marginRight: 12,
      tintColor: colors.primary,
    },
    textContainer: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
      marginBottom: 2,
    },
    itemSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    downloadButton: {
      backgroundColor: colors.primary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      minWidth: 80,
      justifyContent: "center",
      alignItems: "center",
    },
    downloadButtonText: {
      color: colors.buttonText,
      fontSize: 14,
      fontWeight: "500",
    },
    loadingIndicator: {
      padding: 8,
    },
  });

  return (
    <View style={styles.container}>
      <SectionList
        sections={pdfMaterials}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemInfo}>
              <Image
                source={images.pdfIcon}
                style={styles.icon}
                resizeMode="contain"
              />
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemSubtitle}>
                  PDF • {item.size}
                </Text>
              </View>
            </View>
            
            {downloading[item.url] ? (
              <View style={styles.loadingIndicator}>
                <ActivityIndicator color={colors.primary} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => handlePdfPress(item)}
                style={styles.downloadButton}
                disabled={downloading[item.url]}
              >
                <Text style={styles.downloadButtonText}>
                  {t('common.download')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.headerText}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

export default FacultyMaterials;