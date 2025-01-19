import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const SelectUserType = () => {
  return (
    <SafeAreaView className=" w-full h-full flex justify-center items-center gap-3">
      <Text className=" text-3xl font-semibold">Select type</Text>
      <View className="flex flex-row justify-center items-center">
        <TouchableOpacity
          onPress={() => {
            router.push("../BuyerAuth/Login");
          }}
          className=" rounded-full w-[50%] flex justify-center items-center gap-3 p-2"
        >
          <Image
            className=" rounded-full w-44 h-44"
            source={require("../assets/images/BuyerProfile.jpg")}
          />
          <Text className=" text-xl text-primaryBlue font-semibold">Buyer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("../SellerAuth/Login");
          }}
          className=" rounded-full w-[50%] flex justify-center items-center gap-3 p-2"
        >
          <Image
            className=" rounded-full w-44 h-44"
            source={require("../assets/images/SellerProfile.jpg")}
          />
          <Text className="text-xl text-primaryBlue font-semibold">Seller</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SelectUserType;
