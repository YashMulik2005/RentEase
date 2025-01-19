import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import LandingPage from "./LandingPage";

const index = () => {
  return (
    <SafeAreaView>
      {/* <Text className=" text-red-900 text-center">Yash</Text> */}
      <LandingPage />
    </SafeAreaView>
  );
};

export default index;
