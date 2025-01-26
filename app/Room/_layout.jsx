import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RoomsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default RoomsLayout;
