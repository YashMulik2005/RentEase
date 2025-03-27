import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import {
  FontAwesome,
  FontAwesome6,
  Feather,
  Fontisto,
  MaterialIcons,
  AntDesign,
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
      <Tabs.Screen
        name="Create"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? "bedroom-child" : "bedroom-child"}
              size={24}
              color={focused ? color : "#6b7280"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Booked"
        options={{
          tabBarIcon: ({ color, focused }) => {
            <AntDesign
              name={focused ? "checksquare" : "checksquareo"}
              size={24}
              color={color}
            />;
          },
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

export default BuyerTabs;
