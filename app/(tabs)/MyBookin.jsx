import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import BookingCard from "../../components/BookingCard";
import { router } from "expo-router";
import { getMethod } from "../../utils/apiService";
import useAuth from "../../context/AuthContext";

const MyBookin = () => {
  const [userData, setuserData] = useState();
  const [data, setdata] = useState();
  const { token } = useAuth();

  const getData = async () => {
    const res = await getMethod(`booking`, token);
    console.log("nj ", res.data);
    setdata(res?.data);
  };

  // const GetUser = async () => {
  //   const user = await AsyncStorage.getItem("token");
  //   setuserData(user);
  // };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView className=" bg-tabBackground h-full w-full p-4 flex flex-col items-center gap-6">
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
          <Text className=" text-2xl font-bold text-center">Bookings</Text>
        </View>
        <View className="w-[10%]">{/* <Text>nibu</Text> */}</View>
      </View>

      <View className="w-full">
        <TextInput
          className=" w-full bg-zinc-200 px-4 py-3 rounded-lg text-lg"
          keyboardType="ascii-capable"
          placeholder="Search"
        />
      </View>

      <View className="w-full">
        <Text className=" text-xl font-semibold">Bookings</Text>
        <FlatList
          data={data}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <BookingCard data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default MyBookin;
