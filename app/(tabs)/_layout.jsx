import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  FontAwesome,
  FontAwesome6,
  Feather,
  Fontisto,
} from "@expo/vector-icons";

const TabLayout = () => {
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
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name={focused ? "search" : "search"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="MyBookin"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Fontisto
              name={focused ? "bookmark-alt" : "bookmark"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
