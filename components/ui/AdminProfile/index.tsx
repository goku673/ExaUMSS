import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const AdminProfile = () => {
  const router = useRouter();

  const profileData = {
    name: "Rocio",
    gender: "female",
    age: 21,
    joinDate: "June 1st 2016",
  };

  const userOptions = [
    { icon: "create", text: "Edit Profile", action: () => router.push("/edithProfile") },
    { icon: "cloud-upload", text: "Upload Files" },
  ];

  const adminOptions = [
    { icon: "folder", text: "Uploaded Files" },
    { icon: "help-circle", text: "Support and Help" },
    { icon: "library", text: "Content Management" },
    { icon: "stats-chart", text: "Statistics and Reports" },
    { icon: "shield", text: "Security" },
    { icon: "color-palette", text: "Personalization" },
    { icon: "notifications", text: "Notifications" },
  ];

  const navButtons = [
    { icon: "home", text: "Home" },
    { icon: "book", text: "Faculty" },
    { icon: "document-text", text: "Guides" },
    { icon: "refresh", text: "Recent" },
    { icon: "person", text: "Profile", active: true },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/edithProfile")} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Admin Profile</Text>
      </View>

      {/* Profile Info Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatar} />
        <Text style={styles.profileName}>
          {`${profileData.name}, ${profileData.gender}, age ${profileData.age}`}
        </Text>
        <Text style={styles.profileDate}>{profileData.joinDate}</Text>
      </View>

      {/* User Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Options</Text>
        {userOptions.map((option, index) => (
          <ProfileButton key={index} icon={option.icon} text={option.text} onPress={option.action} />
        ))}
      </View>

      {/* Administrator Options */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Administrator options</Text>
        {adminOptions.slice(0, 2).map((option, index) => (
          <ProfileButton key={index} icon={option.icon} text={option.text} />
        ))}
      </View>

      {[2, 4, 6].map((startIdx, sectionIdx) => (
        <View key={sectionIdx} style={styles.section}>
          {adminOptions.slice(startIdx, startIdx + (sectionIdx === 2 ? 1 : 2)).map((option, idx) => (
            <ProfileButton key={idx} icon={option.icon} text={option.text} />
          ))}
        </View>
      ))}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {navButtons.map((button, index) => (
          <NavButton key={index} icon={button.icon} text={button.text} active={button.active} />
        ))}
      </View>
    </ScrollView>
  );
};

interface ProfileButtonProps {
  icon: string;
  text: string;
  onPress?: () => void;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.profileButton} onPress={onPress}>
    <Ionicons name={icon} size={20} color="#2E86C1" />
    <Text style={styles.profileButtonText}>{text}</Text>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

interface NavButtonProps {
  icon: string;
  text: string;
  active?: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, text, active = false }) => (
  <TouchableOpacity style={styles.navButton}>
    <Ionicons name={icon} size={24} color={active ? "#2E86C1" : "#666"} />
    <Text style={[styles.navButtonText, active && styles.navButtonActive]}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: "#2E86C1",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ccc",
    marginBottom: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileDate: {
    color: "#999",
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileButtonText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#fff",
  },
  navButton: {
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 12,
    color: "#666",
  },
  navButtonActive: {
    color: "#2E86C1",
    fontWeight: "bold",
  },
});

export default AdminProfile;
