import { View, Text, Image } from "react-native";
import React from "react";

const OfferCard = () => {
  return (
    <View className=" bg-tabBackground my-2 p-3 gap-2 rounded-lg flex flex-row w-full items-center">
      <View className="w-[15%]">
        <Image
          className=" w-full  aspect-square bg-primaryBlue"
          source={{ uri: "https://image.pngaaa.com/45/292045-middle.png" }}
        />
      </View>
      <View className="w-[85%]">
        <Text className=" text-lg font-semibold">
          get upto 50% off on booking of 10 days.
        </Text>
        <Text>Coupon code:zyhdg</Text>
      </View>
    </View>
  );
};

export default OfferCard;
