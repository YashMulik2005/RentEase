import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";
import { EvilIcons } from "@expo/vector-icons";
import ImageViewing from "react-native-image-viewing";
import ReadMore from "../../components/ReadMore";
import ReviewCard from "../../components/ReviewCard";

const Room = () => {
  const [visible, setvisible] = useState(false);
  const [selectedIndex, setselectedIndex] = useState();
  const router = useRouter();
  const arr = [
    {
      name: "Free Wifi",
    },
    {
      name: " Free breakfast",
    },
    {
      name: "Free Parking",
    },
  ];

  const previewArray = [
    {
      url: "https://i.pinimg.com/474x/2f/7b/97/2f7b97c0a076fcbad08903ae46d348a7.jpg",
    },
    {
      url: "https://i.pinimg.com/474x/53/f2/40/53f240b1941a4d5ecfd179c7091d7d1a.jpg",
    },
    {
      url: "https://i.pinimg.com/474x/6c/88/6a/6c886a58955b62b80b29d29a69432904.jpg",
    },
    {
      url: "https://i.pinimg.com/474x/b8/e3/d7/b8e3d7302458326bded89bfcbf5247c9.jpg",
    },
  ];
  return (
    <SafeAreaView classname=" bg-white h-full w-full">
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

        <View>
          <ScrollView>
            <View className="w-full flex flex-col gap-3">
              <View className="w-full">
                <Image
                  className=" w-full h-72 rounded-md object-cover"
                  source={require("../../assets/images/room1.jpg")}
                />
              </View>
              <View>
                <FlatList
                  data={arr}
                  renderItem={({ item }) => {
                    return (
                      <View className="flex flex-row items-center p-3 rounded-lg bg-secondaryBackground text-gray m-1">
                        <AntDesign name="checkcircle" size={15} color="black" />
                        <Text className="text-md ml-2 font-semibold">
                          {item.name}
                        </Text>
                      </View>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                />
              </View>
              <View className="w-full flex flex-row items-start justify-between">
                <View className="w-[70%]">
                  <Text className="text-xl font-bold mb-2">
                    The Aston Will Hotel
                  </Text>
                  <View className=" flex w-full flex-row items-center">
                    <EvilIcons name="location" size={20} color="#4C4DDC" />
                    <Text className=" text-gray">Bandra, Mumbai</Text>
                  </View>
                </View>
                <View className="w-[30%] flex flex-row justify-end">
                  <Text className=" text-lg font-bold text-primaryBlue">
                    $500{" "}
                    <Text className=" text-lg text-gray font-semibold">
                      /day
                    </Text>
                  </Text>
                </View>
              </View>
              <View className="w-full">
                <Text className=" text-xl font-bold mb-2">Description</Text>
                <ReadMore
                  data="Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged."
                />
              </View>
              <View className="w-full">
                <Text className=" text-xl font-bold mb-2">Preview</Text>
                <FlatList
                  data={previewArray}
                  renderItem={({ item, index }) => {
                    // console.log(item.url);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setselectedIndex(index);
                          setvisible(true);
                        }}
                      >
                        <Image
                          className=" aspect-video h-28 rounded-lg m-1"
                          source={{
                            uri: item.url,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  horizontal={true}
                />
                <ImageViewing
                  images={previewArray.map((item) => ({ uri: item.url })) || []}
                  imageIndex={selectedIndex}
                  visible={visible}
                  onRequestClose={() => setvisible(false)}
                />
              </View>
              <View className="w-full">
                <Text className=" text-xl font-bold mb-2">Reviews</Text>
                <FlatList
                  data={[1, 2, 3, 4]}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => <ReviewCard />}
                  //numColumns={2}
                />
              </View>
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity className=" absolute bottom-5 w-full bg-primaryBlue p-3 items-center rounded-lg">
          <Text className=" text-white font-bold text-lg">Booking Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Room;
