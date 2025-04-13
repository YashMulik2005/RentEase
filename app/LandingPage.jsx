import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

import Slide1 from "../assets/images/landingPageSlide1.png";
import Slide2 from "../assets/images/landingPageSlide2.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const slides = [
  {
    id: "1",
    title: "Luxury Meets Comfort!",
    subtitle: "Book Your Dream Stay Today",
    description:
      "Find your perfect getaway with ease. Secure your stay now and create unforgettable memories!",
    image: Slide1,
  },
  {
    id: "2",
    title: "Explore. Stay. Enjoy!",
    subtitle: "Seamless Bookings, Endless Adventures",
    description:
      "Discover top-rated stays in stunning locations. Travel stress-free and stay in style!",
    image: Slide2,
  },
];

const LandingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
  };

  return (
    <SafeAreaView className="h-full w-full bg-primaryBackground flex justify-center items-center">
      <View className="w-full h-[75%]">
        <FlatList
          data={slides}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <View
              style={{ width }}
              className="flex justify-center items-center"
            >
              <Image
                className="w-full h-[70%]"
                source={item.image}
                resizeMode="cover"
              />
              <View className="w-full h-[20%] flex flex-col items-center gap-1 p-5">
                <Text className="font-bold text-2xl">{item.title}</Text>
                <Text className="font-bold text-2xl">{item.subtitle}</Text>
                <Text className="text-lg px-10 text-center">
                  {item.description}
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <View className="flex flex-row gap-2 my-3">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-3 w-3 rounded-2xl ${
              index === currentIndex ? "bg-primaryBlue" : "bg-gray"
            }`}
          />
        ))}
      </View>

      <TouchableOpacity
        onPress={() => router.push("../BuyerAuth/Login")}
        className="w-[80%] rounded-lg bg-primaryBlue mt-3"
      >
        <LinearGradient
          colors={["#4c71dc", "#4c65dc", "#4C4DDC"]}
          style={{
            padding: 16,
            borderRadius: 10,
            alignItems: "center",
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View className="flex flex-row items-center">
            <Text className="text-white text-lg font-bold">Get Started</Text>
            <AntDesign
              name="arrowright"
              size={22}
              color="white"
              style={{ marginLeft: 8 }}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>

      <StatusBar style="white" />
    </SafeAreaView>
  );
};

export default LandingPage;
