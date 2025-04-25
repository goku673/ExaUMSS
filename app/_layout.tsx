import { Stack } from "expo-router";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
          gestureEnabled: false,
        }}
      >
        <Stack.Screen 
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </PaperProvider>
  );
}