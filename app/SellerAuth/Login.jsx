import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Login = () => {
  return (
    <SafeAreaView className=" relative flex justify-center p-5 h-full w-full gap-3">
      <View>
        <Text className=" font-bold text-3xl ">Login</Text>
        <Text className=" text-gray">Please fill in the credentials</Text>
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
      <TouchableOpacity
        onPress={() => {
          router.push("/(tabs)/Home");
        }}
        className=" bg-primaryBlue p-4 rounded-xl"
      >
        <Text className=" text-white font-bold text-center text-xl">Login</Text>
      </TouchableOpacity>
      <View className="">
        <Text className=" text-gray text-lg text-center">
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/SellerAuth/SignUp")}>
          <Text className=" text-lg text-primaryBlue font-bold text-center">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
