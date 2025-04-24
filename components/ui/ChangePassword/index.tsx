import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";

export default function ChangePassword() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      {/* Header */}
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <ArrowLeft size={24} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <View style={{ backgroundColor: "#00AEEF", paddingVertical: 8, borderRadius: 6, marginBottom: 20 }}>
        <Text style={{ textAlign: "center", color: "#fff", fontWeight: "bold", fontSize: 18 }}>
          Password
        </Text>
      </View>

      {/* Description */}
      <Text style={{ marginBottom: 12 }}>
        Choose a secure password, use at least 8 characters, use numbers, symbols and letters
      </Text>

      {/* New password */}
      <Text style={{ fontWeight: "600", marginBottom: 6 }}>New password</Text>
      <TextInput
        secureTextEntry
        placeholder="••••••••••"
        style={{
          backgroundColor: "#d1ecf1",
          borderRadius: 6,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginBottom: 16,
        }}
      />

      {/* Confirm password */}
      <Text style={{ fontWeight: "600", marginBottom: 6 }}>Confirm password</Text>
      <Text style={{ marginBottom: 6, fontSize: 12, color: "#333" }}>
        For security reasons, please confirm your new password.
      </Text>
      <TextInput
        secureTextEntry
        placeholder="••••••••••"
        style={{
          backgroundColor: "#d1ecf1",
          borderRadius: 6,
          paddingHorizontal: 12,
          paddingVertical: 8,
          marginBottom: 24,
        }}
      />

      {/* Change Password button */}
      <TouchableOpacity
        style={{
          backgroundColor: "#f5a623",
          paddingVertical: 12,
          borderRadius: 6,
        }}
        onPress={() => {
          // Acción al cambiar contraseña
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold" }}>
          Change password
        </Text>
      </TouchableOpacity>
    </View>
  );
}
