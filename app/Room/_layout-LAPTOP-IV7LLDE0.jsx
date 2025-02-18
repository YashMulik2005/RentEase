import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RoomsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
      <Stack.Screen name="BookingCalender" />
      <Stack.Screen name="ResidentDeatils" />
    </Stack>
  );
};

export default RoomsLayout;
