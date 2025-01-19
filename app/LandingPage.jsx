import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";

const LandingPage = () => {
  return (
    <SafeAreaView className=" relative h-full w-full flex justify-center items-center gap-4 bg-primaryBackground">
      <View className=" w-[100%] h-[60%]">
        <Image
          className=" w-[100%] h-[100%]"
          source={require("../assets/images/landingHome.png")}
        />
      </View>
      <View className="w-full h-[40%] flex flex-col items-center gap-3 p-5">
        <Text className=" font-bold text-3xl">Stay In Style!</Text>
        <Text className=" font-bold text-3xl">Book With A Smile</Text>
        <Text className=" text-xl px-10 text-center">
          Your perfect stay is just a reservation away, book now and make
          moments that matter.
        </Text>
        <TouchableOpacity
          activeOpacity=""
          onPress={() => {
            router.push("SelectUserType");
          }}
          className=" bottom-10 right-10 absolute rounded-full p-5 bg-primaryBlue"
        >
          <AntDesign name="arrowright" size={22} color="white" />
        </TouchableOpacity>
      </View>
      <StatusBar style="white" color="white" />
    </SafeAreaView>
  );
};

export default LandingPage;
