import { Stack } from "expo-router";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useEffect } from "react";
import { startServer } from "../src/infrastructure/api/mocks/server";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Layout() {
  useEffect(() => {
    startServer();
  }, []);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <Stack screenOptions={{ headerShown: false }} />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}