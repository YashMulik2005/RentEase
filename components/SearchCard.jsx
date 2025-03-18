import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

const SearchCard = ({ data }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`/Room/${data?._id}`);
      }}
      className="bg-white w-full rounded-lg flex flex-row p-4 my-2"
    >
      <View className=" w-[30%]">
        <Image
          className=" h-24 w-24 object-cover rounded-lg"
          source={{ uri: data?.titleImage }}
        />
      </View>
      <View className=" w-[70%] flex flex-col">
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
          {data?.owner_id?.apartment}, {data?.owner_id?.city}
        </Text>
        <Text numberOfLines={1}>{data?.description}</Text>
        <Text className=" text-primaryBlue font-bold">
          {data?.price?.$numberDecimal} ₹/day
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SearchCard;
