import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";

interface FormFieldProps {
  label: string;
  placeholder: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  editable?: boolean;
  [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({ label, placeholder, ...props }) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, !props.editable && styles.readOnlyInput]}
      placeholder={placeholder}
      placeholderTextColor="#999"
      editable={props.editable}
      {...props}
    />
  </View>
);

const EditProfile = () => {
  const navigation = useNavigation();
  const router = useRouter();

  const handleSave = () => {
    // Lógica para guardar los cambios
    Alert.alert("Profile Saved", "Your profile changes have been saved.");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.saveButton}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* Avatar Section */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Ionicons name="camera" size={24} color="#2E86C1" />
        </View>
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </View>

      {/* Form Fields */}
      // dentro de EditProfile()
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <FormField label="Full Name" placeholder="Erick Suarez Canelas" />
        <FormField label="Birthdate" placeholder="30 de marzo de 1998" />
        <FormField label="Gender" placeholder="Male" />
        <FormField label="Member Since" placeholder="June 1st 2016" editable={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <FormField label="Email" placeholder="Eri1ck@gmail.com" keyboardType="email-address" editable={false} />
        <FormField label="Phone Number" placeholder="+591 774428284" keyboardType="phone-pad" editable={false} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <TouchableOpacity onPress={() => router.push("/changePassword")}>
          <FormField label="Password" placeholder="**************" editable={false} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <FormField label="Language" placeholder="English" editable={false} />
        <FormField label="Theme" placeholder="Light" editable={false} />
        <FormField label="Notifications" placeholder="Enabled" editable={false} />
      </View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E86C1',
    padding: 15,
    paddingTop: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#2E86C1',
    fontSize: 16,
  },
  formSection: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  fieldContainer: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
  },
  readOnlyInput: {
    color: '#999',
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E86C1',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2E86C1',
    paddingBottom: 5,
  },
  settingItem: {
    paddingVertical: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  
});

export default EditProfile;
