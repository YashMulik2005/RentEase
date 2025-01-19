import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const BuyerAuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" />
    </Stack>
  );
};

export default BuyerAuthLayout;
