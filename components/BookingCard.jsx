import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const BookingCard = () => {
  return (
    <TouchableOpacity className="bg-white w-full rounded-lg flex flex-col p-4 my-2">
      <View className="w-full flex flex-row gap-4">
        <View className="w-[15%]">
          <Image
            className="h-16 aspect-square rounded-lg"
            source={require("../assets/images/room.jpg")}
          />
        </View>
        <View className="w-[85%]">
          <Text className=" font-semibold text-lg">guyvd hvdcudv vducydv</Text>
          <Text className=" text-gray font-semibold">
            Start From:<Text className=" text-green-800">12 january 2025</Text>
          </Text>
        </View>
      </View>

      <View className="w-full h-[1px] bg-zinc-300 mt-2"></View>
      <View className="w-full mt-2 flex flex-row gap-1">
        <View className=" w-[80%] flex flex-col gap-1">
          <Text className=" text-gray font-semibold">
            Address:{" "}
            <Text className=" text-black">
              Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
              Bangalore-560016
            </Text>
          </Text>
          <Text className=" text-gray font-semibold">
            Duration: <Text className=" text-black">2 weeks</Text>
          </Text>
        </View>
        <View className=" w-[20%] flex flex-col justify-end">
          <TouchableOpacity className=" bg-primaryBlue p-2 rounded-3xl">
            <Text className="text-white font-semibold text-center">
              Recepit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;
