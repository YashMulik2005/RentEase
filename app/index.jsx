import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";
import LandingPage from "./LandingPage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const index = () => {
  const [loader, setloader] = useState(true);
  const getUser = async () => {
    const user = await AsyncStorage.getItem("token");
    if (user) {
      router.push("./(tabs)/Home");
    } else {
      router.push("./LandingPage");
    }
    setloader(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView>
      {/* <Text className=" text-red-900 text-center">Yash</Text> */}
      {loader ? (
        <View className=" w-full h-full flex flex-col justify-center items-center">
          <ActivityIndicator size="small" color="blue" />
        </View>
      ) : // <LandingPage />
      null}
    </SafeAreaView>
  );
};

export default index;
