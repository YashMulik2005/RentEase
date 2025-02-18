import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const SignUp = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onSubmit = async () => {
    console.log("submit");
    try {
      const res = await axios.post(
        "https://rent-ease-bcakend-v2.vercel.app/api/auth/usersignup",
        {
          username: username,
          email: email,
          password: password,
        }
      );

      if (res.status == 201) {
        console.log("ndjbd");
        router.push("/BuyerAuth/Login");
        // console.log(res.data);
      }
    } catch (err) {
      if (err.status === 400) {
        console.log(err.response?.data?.message || "Invalid credentials");
      } else {
        console.log("An error occurred:", err.message);
      }
    }
  };

  return (
    <SafeAreaView className=" relative flex justify-center h-full w-full gap-3">
      <ScrollView className=" h-screen">
        <View className=" h-screen flex flex-col bg-primaryBlue">
          <View className="w-full h-[20%] bg-primaryBlue items-center">
            <LinearGradient
              colors={["#4C4DDC", "#4c65dc", "#4c71dc"]}
              className="h-full w-full px-5 flex justify-center "
            >
              <Text className="text-white text-3xl font-bold">Rgister</Text>
            </LinearGradient>
          </View>
          <View className="w-full h-[85%] flex flex-col justify-between px-5 py-10 rounded-t-3xl bg-white">
            <View className=" flex felx-col gap-4">
              <View className=" flex flex-col gap-2">
                <Text className="font-bold text-3xl">Join Us Today! 🚀</Text>
                <Text className="text-gray">
                  Create an account to unlock amazing stay options, manage
                  bookings effortlessly, and enjoy a seamless rental experience.
                  Just a few steps and you’re in!
                </Text>
              </View>
              <View className=" flex flex-col gap-3">
                <Text className=" text-xl font-semibold text-gray">
                  Username:
                </Text>
                <TextInput
                  className=" bg-zinc-100 px-4 py-4 rounded-lg text-lg"
                  keyboardType="ascii-capable"
                  placeholder="username"
                  onChangeText={(text) => setusername(text)}
                />
              </View>
              <View className=" flex flex-col gap-3">
                <Text className=" text-xl font-semibold text-gray">Email:</Text>
                <TextInput
                  className=" bg-zinc-100 px-4 py-4  rounded-lg text-lg"
                  keyboardType="email-address"
                  placeholder="email"
                  onChangeText={(text) => setemail(text)}
                />
              </View>
              <View className="flex flex-col gap-3">
                <Text className="text-xl font-semibold text-gray">
                  Password:
                </Text>
                <TextInput
                  className="bg-zinc-100 px-4 py-4 rounded-lg text-lg"
                  keyboardType="default"
                  placeholder="password"
                  secureTextEntry={true}
                  onChangeText={(text) => setpassword(text)}
                />
              </View>
              <TouchableOpacity onPress={onSubmit} className="">
                <LinearGradient
                  colors={["#4c71dc", "#4c65dc", "#4C4DDC"]}
                  style={{
                    padding: 16,
                    borderRadius: 10,
                    alignItems: "center",
                  }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                >
                  <Text className=" text-white font-bold text-center text-xl">
                    Register
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View className=" my-3">
              <Text className=" text-gray text-lg text-center">
                Already have an account?
              </Text>
              <TouchableOpacity onPress={() => router.push("/BuyerAuth/Login")}>
                <Text className=" text-lg text-primaryBlue text-center">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#4C4DDC" style="auto" />
    </SafeAreaView>
  );
};

export default SignUp;
