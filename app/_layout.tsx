/*
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ title: 'Authentication' }} />
      <Stack.Screen name="(auth)/login" options={{ title: 'Login' }} />
      <Stack.Screen name="(auth)/register" options={{ title: 'Register' }} />
      <Stack.Screen name="(auth)/forgot-password" options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="(auth)/reset-password" options={{ title: 'Reset Password' }} /> }///ocultar
      /*
      <Stack.Screen name="(auth)/login" options={{ title: 'Login' }} /> 
      <Stack.Screen name="(auth)/register" options={{ title: 'Register' }} />
      <Stack.Screen name="landing" options={{ title: 'landing' }} />
      <Stack.Screen name="faculty" options={{ title: 'Faculties' }} />
    </Stack>
  );
}
*/
import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="faculties" />
    </Stack>
  );
}