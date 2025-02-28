import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-virtualized-view";
import { EvilIcons } from "@expo/vector-icons";
import ImageViewing from "react-native-image-viewing";
import ReadMore from "../../components/ReadMore";
import ReviewCard from "../../components/ReviewCard";
import { useRoute } from "@react-navigation/native";
import { getMethod } from "../../utils/apiService";
import useAuth from "../../context/AuthContext";

const Room = () => {
  const route = useRoute();
  const { id } = route.params;
  const [visible, setvisible] = useState(false);
  const [selectedIndex, setselectedIndex] = useState();
  const router = useRouter();
  const [hotelData, sethotelData] = useState();
  const [loader, setloader] = useState(false);
  const { bookingDetails, setbookingDetails } = useAuth();

  const getData = async () => {
    setloader(true);
    const res = await getMethod(`room/single/info/get/${id}`);
    sethotelData(res?.data);
    setloader(false);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <SafeAreaView classname=" bg-white h-full w-full">
      {loader ? (
        <View className=" h-full w-full">
          <ActivityIndicator size="large" color="#4C4DDC" />
        </View>
      ) : (
        <View className=" p-4 h-full w-full flex flex-col items-center gap-6">
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

          <View className="w-full h-full flex flex-col gap-1">
            <View className=" h-[88%]">
              <ScrollView
                showsVerticalScrollIndicator={false}
                className="w-full"
              >
                <View className="w-full flex flex-col gap-3">
                  <View className="w-full">
                    <Image
                      className=" w-full h-72 rounded-md object-cover"
                      source={{ uri: hotelData?.titleImage }}
                    />
                  </View>
                  <View>
                    <FlatList
                      data={hotelData?.options}
                      renderItem={({ item }) => {
                        return (
                          <View className="flex flex-row items-center p-3 rounded-lg bg-secondaryBackground text-gray m-1">
                            <AntDesign
                              name="checkcircle"
                              size={15}
                              color="black"
                            />
                            <Text className="text-md ml-2 font-semibold">
                              {item.name}
                            </Text>
                          </View>
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                  <View className="w-full flex flex-row items-start justify-between">
                    <View className="w-[70%]">
                      <Text className="text-xl font-bold mb-2">
                        {hotelData?.owner_id?.hotelName}
                      </Text>
                      <View className=" flex w-full flex-row items-center">
                        <EvilIcons name="location" size={20} color="#4C4DDC" />
                        <Text className=" text-gray">
                          {hotelData?.owner_id?.apartment},{" "}
                          {hotelData?.owner_id?.streetName},{" "}
                          {hotelData?.owner_id?.city},
                          {hotelData?.owner_id?.state}
                        </Text>
                      </View>
                    </View>
                    <View className="w-[30%] flex flex-row justify-end">
                      <Text className=" text-lg font-bold text-primaryBlue">
                        {hotelData?.price?.$numberDecimal}{" "}
                        <Text className=" text-lg text-gray font-semibold">
                          /day
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View className="w-full">
                    <Text className=" text-xl font-bold mb-2">Description</Text>
                    <ReadMore data={hotelData?.description} />
                  </View>
                  <View className="w-full">
                    <Text className=" text-xl font-bold mb-2">Preview</Text>
                    <FlatList
                      data={hotelData?.images}
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
                                uri: item,
                              }}
                            />
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal={true}
                    />
                    <ImageViewing
                      images={
                        hotelData?.images.map((item) => ({ uri: item })) || []
                      }
                      imageIndex={selectedIndex}
                      visible={visible}
                      onRequestClose={() => setvisible(false)}
                    />
                  </View>
                  <View className="w-full">
                    <Text className=" text-xl font-bold mb-2">Reviews</Text>
                    <FlatList
                      data={[1, 2, 3]}
                      keyExtractor={(item) => item.toString()}
                      renderItem={({ item }) => <ReviewCard />}
                      //numColumns={2}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
            <View className=" h-[5%] flex flex-col justify-center items-center">
              <TouchableOpacity
                onPress={() => {
                  setbookingDetails({
                    room_id: id,
                  });
                  router.push("./BookingCalender");
                }}
                className="w-full bg-primaryBlue p-3 items-center rounded-lg"
              >
                <Text className=" text-white font-bold text-lg">
                  Booking Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Room;
