import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="index" />
        {/* Otras pantallas de tabs si las necesitas */}
      </Tabs>
    );
  }