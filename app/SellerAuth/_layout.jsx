import React from "react";
import { Stack } from "expo-router";

const SellerAuthLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" />
    </Stack>
  );
};

export default SellerAuthLayout;
