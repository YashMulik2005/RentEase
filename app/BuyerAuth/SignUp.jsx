import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const SignUp = () => {
  return (
    <SafeAreaView className=" relative flex justify-center p-5 h-full w-full gap-3">
      <View>
        <Text className=" font-bold text-3xl ">SignUp</Text>
        <Text className=" text-gray">Please fill in the credentials</Text>
      </View>
      <View className=" flex flex-col gap-3">
        <Text className=" text-xl font-semibold text-gray">Username:</Text>
        <TextInput
          className=" border border-gray px-4 py-3 rounded-lg text-lg"
          keyboardType="ascii-capable"
          placeholder="username"
        />
      </View>
      <View className=" flex flex-col gap-3">
        <Text className=" text-xl font-semibold text-gray">Email:</Text>
        <TextInput
          className=" border border-gray px-4 py-3 rounded-lg text-lg"
          keyboardType="email-address"
          placeholder="email"
        />
      </View>
      <View className="flex flex-col gap-3 my-2">
        <Text className="text-xl font-semibold text-gray">Password:</Text>
        <TextInput
          className="border border-gray px-4 py-3 rounded-lg text-lg"
          keyboardType="default"
          placeholder="password"
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity className=" bg-primaryBlue p-4 rounded-xl">
        <Text className=" text-white font-bold text-center text-xl">
          Register
        </Text>
      </TouchableOpacity>
      <View className="">
        <Text className=" text-gray text-lg text-center">
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/BuyerAuth/Login")}>
          <Text className=" text-lg text-primaryBlue text-center">Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
