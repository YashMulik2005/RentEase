import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const FilterList = () => {
  const [selectedFilter, setselectedFilter] = useState("single");
  const arr = [
    {
      name: "Single",
    },
    {
      name: "Double",
    },
    {
      name: "Triple",
    },
    {
      name: "Suite",
    },
    {
      name: "Single",
    },
    {
      name: "Double",
    },
    {
      name: "Triple",
    },
    {
      name: "Suite",
    },
  ];
  return (
    <View className=" w-full">
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {arr.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (selectedFilter === item.name) {
                  setselectedFilter("none");
                } else {
                  setselectedFilter(item.name);
                }
              }}
              key={index}
              className={` ${
                selectedFilter == item?.name
                  ? " bg-primaryBlue text-white"
                  : "bg-secondaryBackground text-gray"
              }  px-4 p-3 mx-[5px] m-1 rounded-lg aspect-auto `}
            >
              <Text
                className={` ${
                  selectedFilter == item?.name ? "  text-white" : " text-gray"
                }  text-xl `}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FilterList;
