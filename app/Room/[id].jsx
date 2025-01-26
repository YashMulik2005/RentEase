import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Room = () => {
  const router = useRouter();
  return (
    <SafeAreaView classname="bg-tabBackground h-full w-full">
      <View className=" p-4 h-full w-full flex flex-col items-center gap-6 relative">
        <View className="w-full flex flex-row items-center">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            className="p-1 rounded-lg border border-zinc-300 w-[10%]"
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <View className=" w-[80%]">
            <Text className=" text-2xl font-bold text-center">Details</Text>
          </View>
          <View className="w-[10%]">{/* <Text>nibu</Text> */}</View>
        </View>

        <View className="w-full"></View>

        <TouchableOpacity className=" absolute bottom-5 w-full bg-primaryBlue p-3 items-center rounded-lg">
          <Text className=" text-white font-bold text-lg">Booking Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Room;
