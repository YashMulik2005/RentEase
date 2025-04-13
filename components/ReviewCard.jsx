import { View, Text, Image } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import moment from "moment";

const ReviewCard = ({ data }) => {
  console.log(data);
  const filledStars = data?.rating || 0;
  const totalStars = 5;

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
          <Text className=" text-xl font-bold">{data.user_id.username}</Text>
          <Text className=" text-gray">
            {moment(data.created_at).startOf("day").fromNow()}
          </Text>
        </View>
      </View>
      <View>
        <View className=" flex flex-row gap-1 mb-1">
          {[...Array(totalStars)].map((_, index) => (
            <AntDesign
              key={index}
              name={index < filledStars ? "star" : "staro"}
              size={18}
              color={index < filledStars ? "#FFD700" : "black"}
            />
          ))}
        </View>
        <Text>{data?.review_text}</Text>
      </View>
    </View>
  );
};

export default ReviewCard;
