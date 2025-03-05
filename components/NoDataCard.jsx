import { View, Text, Image } from "react-native";
import React from "react";

const NoDataCard = () => {
  return (
    <View className="flex flex-col justify-center items-center">
      <Image
        className=" w-60 h-60"
        source={require("../assets/images/NoData404.png")}
      />
      <Text className=" my-[-25px] font-bold text-xl">No Result found</Text>
    </View>
  );
};

export default NoDataCard;
