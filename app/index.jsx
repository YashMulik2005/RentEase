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
    try {
      const user = await AsyncStorage.getItem("user");
      const owner = await AsyncStorage.getItem("owner");

      if (user) {
        router.push("./(tabs)/Home");
      } else if (owner) {
        router.push("SellerTabs/Home");
      } else {
        router.push("./LandingPage");
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      router.push("./LandingPage");
    } finally {
      setloader(false);
    }
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
