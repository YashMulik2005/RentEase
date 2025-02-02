import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const SearchCard = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/Room/${1}`);
      }}
      className="bg-white w-full rounded-lg flex flex-row p-4 my-2"
    >
      <View className=" w-[30%]">
        <Image
          className=" h-24 w-24 object-cover rounded-lg"
          source={require("../assets/images/room.jpg")}
        />
      </View>
      <View className=" relative w-[70%] flex flex-col gap-1">
        <View className=" flex flex-row justify-between">
          <Text className=" w-[75%] font-bold text-xl">Asto vill Hotel </Text>
          <View className=" w-[25%]  flex flex-row gap-1 items-center">
            <AntDesign name="star" size={20} color="#FFD700" />
            <Text className=" font-bold text-lg">5.0</Text>
          </View>
        </View>
        <Text className=" w-full text-gray">neb ibeiu bbeji jbieb becieb</Text>
        <Text className=" absolute bottom-2 text-primaryBlue font-bold text-xl mt-2">
          $500{" "}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;
