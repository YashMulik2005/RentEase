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
import { getMethod, postMethod } from "../../utils/apiService";
import useAuth from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal, TextInput } from "react-native";

const Room = () => {
  const route = useRoute();
  const { id } = route.params;
  const [visible, setvisible] = useState(false);
  const [selectedIndex, setselectedIndex] = useState();
  const router = useRouter();
  const [hotelData, sethotelData] = useState();
  const [loader, setloader] = useState(false);
  const { bookingDetails, setbookingDetails, token } = useAuth();
  const [owner, setowner] = useState(null);
  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewStars, setReviewStars] = useState(0);
  const [reviews, setreviews] = useState([]);

  const getData = async () => {
    setloader(true);
    const o = await AsyncStorage.getItem("owner");
    if (o) setowner(o);
    const res = await getMethod(`room/single/info/get/${id}`);
    sethotelData(res?.data);
    setloader(false);
  };

  console.log(owner);

  const getReview = async () => {
    const res = await getMethod(`review/${id}`);
    console.log(res?.data?.data);
    setreviews(res?.data?.data);
  };

  useEffect(() => {
    getData();
    getReview();
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
            <View className={` ${owner ? "h-[93%]" : "h-[88%]"} `}>
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
                        {hotelData?.price?.$numberDecimal}
                        {"₹ "}
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
                    <View className=" flex flex-row justify-between items-center">
                      <Text className=" text-xl font-bold mb-2">Reviews</Text>
                      <TouchableOpacity
                        onPress={() => setReviewModalVisible(true)}
                      >
                        <Text className=" text-blue-700 font-bold">
                          {" "}
                          Add Review
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <FlatList
                      data={reviews}
                      keyExtractor={(item) => item._id.toString()}
                      renderItem={({ item }) => <ReviewCard data={item} />}
                      ListEmptyComponent={
                        <View className="py-4 items-center justify-center">
                          <Text className="text-gray-500 font-bold text-base">
                            No reviews till now
                          </Text>
                        </View>
                      }
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
            {!owner && (
              <View className=" h-[5%] flex flex-col justify-center items-center">
                <TouchableOpacity
                  onPress={() => {
                    setbookingDetails({
                      room_id: id,
                      amount: hotelData?.price?.$numberDecimal,
                    });
                    router.push("./BookingCalender");
                  }}
                  className="w-full bg-primaryBlue p-3 items-center rounded-lg"
                >
                  <Text className=" text-white font-bold text-lg">
                    Book Now
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
      <Modal
        visible={reviewModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setReviewModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center w-full border bg-black/50">
          <View className="bg-white p-6 rounded-xl w-[90%]">
            <Text className="text-xl font-bold mb-2">Leave a Review</Text>

            <View className="flex flex-col gap-1">
              <Text className="text-lg font-semibold text-gray">Email:</Text>
              <TextInput
                placeholder="Write your review..."
                multiline
                numberOfLines={4}
                className="border border-gray px-4 py-2 rounded-lg text-lg"
                value={reviewText}
                onChangeText={setReviewText}
              />
            </View>

            <View className="flex flex-col gap-1">
              <Text className="text-lg font-semibold text-gray">stars:</Text>
              <TextInput
                placeholder="Rating (1-5)"
                keyboardType="numeric"
                className="border border-gray px-4 py-2 rounded-lg text-lg"
                value={reviewStars.toString()}
                onChangeText={(text) => setReviewStars(parseInt(text))}
              />
            </View>

            <View className="flex flex-row justify-between mt-4">
              <TouchableOpacity
                className="bg-red-500 px-4 py-2 rounded"
                onPress={() => setReviewModalVisible(false)}
              >
                <Text className="text-white font-bold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-primaryBlue px-4 py-2 rounded"
                onPress={async () => {
                  const review = {
                    room_id: id,
                    review_text: reviewText,
                    rating: reviewStars,
                  };

                  console.log("data", review);

                  try {
                    const res = await postMethod("review", review, token);
                    console.log(res);
                    // Update this API as per your backend
                    if (res.data) {
                      alert("Review added!");
                      setReviewText("");
                      setReviewStars(0);
                      setReviewModalVisible(false);
                      // refresh reviews
                    } else {
                      alert("Failed to submit review");
                    }
                  } catch (error) {
                    alert("Error submitting review");
                    console.error(error);
                  }
                }}
              >
                <Text className="text-white font-bold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Room;
