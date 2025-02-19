import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const ReviewCard = () => {
  return (
    <View className=" bg-white my-2 rounded-lg p-4 w-full">
      <View className="flex flex-row justify-between mb-1 w-full">
        <View className=" w-[20%] ">
          <Image
            className=" h-14 aspect-square rounded-full"
            source={require("../assets/images/SellerProfile.jpg")}
          />
        </View>
        <View className=" w-[80%]">
          <Text className=" text-xl font-bold">John Dev</Text>
          <Text className=" text-gray">May 12, 2024</Text>
        </View>
      </View>
      <View>
        <View className=" flex flex-row gap-1 mb-1">
          <AntDesign name="star" size={18} color="#FFD700" />
          <AntDesign name="star" size={18} color="#FFD700" />
          <AntDesign name="star" size={18} color="#FFD700" />
          <AntDesign name="star" size={18} color="#FFD700" />
          <AntDesign name="staro" size={18} color="black" />
        </View>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s
        </Text>
      </View>
    </View>
  );
};

export default ReviewCard;
