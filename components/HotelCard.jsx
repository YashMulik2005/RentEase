import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const HotelCard = ({ data }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/Room/${data._id}`);
      }}
      className="bg-white rounded-lg mx-2 w-72"
    >
      <Image
        className=" aspect-square h-72  rounded-t-lg"
        source={{ uri: data?.titleImage }}
      />
      <View className=" flex p-3 ">
        <View className=" flex flex-row justify-between">
          <Text className=" w-[75%] font-bold text-xl">
            {data?.owner_id?.hotelName}
          </Text>
          <View className=" w-[25%]  flex flex-row gap-1 items-center">
            <AntDesign name="star" size={20} color="#FFD700" />
            <Text className=" font-bold text-lg">5.0</Text>
          </View>
        </View>
        <Text className=" w-full text-gray">
          {data?.owner_id?.apartment} {data?.owner_id?.city}
        </Text>
        <Text numberOfLines={1}>{data?.description}</Text>
        <Text className=" text-primaryBlue font-bold text-xl mt-2">
          {data?.price?.$numberDecimal} ₹/day
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HotelCard;
