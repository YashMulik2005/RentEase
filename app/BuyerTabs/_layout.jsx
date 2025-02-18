import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  FontAwesome,
  FontAwesome6,
  Feather,
  Fontisto,
} from "@expo/vector-icons";

const BuyerTabs = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarPosition: "bottom",
        tabBarActiveTintColor: "#4C4DDC",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 0,
          height: 55,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome6
              name={focused ? "house" : "house"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen name="Create" />
      <Tabs.Screen name="Booked" />
      <Tabs.Screen name="Profile" />
    </Tabs>
  );
};

export default BuyerTabs;
