
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="faculties" />
      <Stack.Screen name="facultyContent" />
      <Stack.Screen name="adminProfile" />
      <Stack.Screen name="edithProfile" />
      <Stack.Screen name="changePassword" />
    </Stack>
  );
}