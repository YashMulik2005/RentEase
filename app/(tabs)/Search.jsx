import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchCard from "../../components/SearchCard";

const Search = () => {
  const router = useRouter();
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
          <Text className=" text-2xl font-bold text-center">Search</Text>
        </View>
        <View className="w-[10%]">{/* <Text>nibu</Text> */}</View>
      </View>
      <View className="w-full">
        <TextInput
          className=" border w-full border-zinc-300 px-4 py-3 rounded-lg text-lg"
          keyboardType="ascii-capable"
          placeholder="Search"
        />
      </View>

      <View className="w-full">
        <Text className=" text-xl font-semibold">Results</Text>
        <FlatList
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <SearchCard />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Search;
