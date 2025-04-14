import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import BookingCard from "../../components/BookingCard";
import { router } from "expo-router";
import { getMethod } from "../../utils/apiService";
import useAuth from "../../context/AuthContext";
import NoDataCard from "../../components/NoDataCard";
import { StatusBar } from "expo-status-bar";
import SearchCard from "../../components/SearchCard";

const Create = () => {
  const [loading, setloading] = useState(false);
  const [results, setresults] = useState([]);
  const { token } = useAuth();

  const getData = async () => {
    setloading(true);
    const res = await getMethod("room/owner", token);
    console.log("data: ", res?.data);
    setresults(res?.data?.data);
    setloading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView className=" bg-tabBackground h-[100%] w-full p-4 flex flex-col items-center gap-6">
      <View className="w-full h-[5%] flex flex-row items-center">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
          className="p-1 rounded-lg border border-zinc-300 w-[10%]"
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View className=" w-[80%]">
          <Text className=" text-2xl font-bold text-center">Rooms</Text>
        </View>
        <View className="w-[10%]">{/* <Text>nibu</Text> */}</View>
      </View>
      <View className="w-full h-[94%]">
        <Text className="text-xl font-semibold">Results</Text>
        {loading ? (
          <View className=" w-full h-full flex justify-center items-center">
            <ActivityIndicator size="large" color="#4C4DDC" className="mt-4" />
          </View>
        ) : results ? (
          results.length > 0 ? (
            <FlatList
              data={results}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <SearchCard data={item} />}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <NoDataCard />
          )
        ) : null}
      </View>
      <View className=" absolute bottom-4 flex justify-center items-center right-2 bg-primaryBlue rounded-xl p-3 px-5">
        <TouchableOpacity
          onPress={() => {
            router.push("Rooms");
          }}
        >
          <Text className=" text-3xl text-white">+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Create;
