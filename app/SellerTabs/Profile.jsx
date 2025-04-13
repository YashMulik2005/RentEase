import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("owner");
        if (userData) {
          setUser(JSON.parse(userData));
          console.log(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("owner");
      setUser(null);
      setModalVisible(false);
      console.log("User logged out");
      router.push("../BuyerAuth/Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView className="bg-secondaryBackground h-full relative">
      <View className="flex flex-col items-center h-full w-full bg-[#4C4DDC]">
        <View className="h-[20%] w-full">
          <LinearGradient
            colors={["#4c71dc", "#4c65dc", "#4C4DDC"]}
            className="h-full w-full px-5 flex justify-center"
          />
        </View>
        <View className="h-[80%] w-full flex flex-col justify-center items-center bg-white rounded-t-[80px] relative">
          <View className="bg-zinc-300 w-48 h-48 rounded-full border absolute top-[-70px] left-1/2 -translate-x-1/2">
            <Image
              source={{
                uri: "https://img.freepik.com/free-photo/view-building-with-cartoon-style-architecture_23-2151154935.jpg?semt=ais_hybrid&w=740",
              }}
              className="h-full w-full rounded-full"
            />
          </View>
          <View className="flex flex-col gap-2 w-full px-10">
            <View className="w-full">
              <Text className="font-semibold text-lg text-gray">
                HotelName:
              </Text>
              <Text className="text-2xl font-bold text-gray-800">
                {user?.hotelName || "Guest"}
              </Text>
            </View>
            <View className="w-full">
              <Text className="font-semibold text-lg text-gray">Email:</Text>
              <Text className="text-2xl font-bold text-gray-800">
                {user?.email || "Not Available"}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <LinearGradient
              colors={["#4c71dc", "#4c65dc", "#4C4DDC"]}
              style={{
                padding: 10,
                paddingHorizontal: 20,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 20,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text className="text-white font-bold text-center text-xl">
                Logout
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("../BuyerAuth/Login")}
            className=" absolute bottom-5"
          >
            <Text className=" text-blue-500 text-md">Create Buyer Account</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center w-full border bg-black/50">
          <View className="bg-white p-6 rounded-xl w-80">
            <Text className="text-xl font-bold text-center text-gray-800">
              Are you sure you want to log out?
            </Text>
            <View className="flex-row justify-between mt-5">
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                <Text className="text-gray-800 font-semibold text-lg">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                className="px-4 py-2 bg-red-500 rounded-lg"
              >
                <Text className="text-white font-semibold text-xl">Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <StatusBar style="light" backgroundColor="#4c71dc" />
    </SafeAreaView>
  );
};

export default Profile;
