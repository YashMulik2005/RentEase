import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuth from "../../context/AuthContext";
import { getMethod, postMethod } from "../../utils/apiService";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { setlocation } = useAuth();
  const [loader, setloader] = useState(false);
  const { token, settoken } = useAuth();
  const onSubmit = async () => {
    try {
      setloader(true);
      const res = await postMethod("auth/userlogin", {
        email: email,
        password: password,
      });

      if (res.status == 200) {
        await AsyncStorage.setItem("token", res?.data?.token);
        console.log("login sucessfull");
        const result = await getMethod("user/getuser", res?.data?.token);
        console.log(result?.data);
        console.log(res?.data?.token);
        settoken(res?.data?.token);
        await AsyncStorage.setItem("user", JSON.stringify(result?.data));
        setlocation(null);
        router.push("/(tabs)/Home");
      }
    } catch (err) {
      if ((err.status = 400)) {
        console.log(err);
        console.log("Invalid credentials");
      }
    }
    setloader(false);
  };

  return (
    <SafeAreaView className=" relative flex justify-center h-full w-full gap-3">
      <ScrollView className=" h-screen">
        <View className=" h-screen flex flex-col bg-primaryBlue">
          <View className="w-full h-[20%] bg-primaryBlue items-center">
            <LinearGradient
              colors={["#4c71dc", "#4c65dc", "#4C4DDC"]}
              className="h-full w-full px-5 flex justify-center "
            >
              <Text className="text-white text-3xl font-bold">Login</Text>
            </LinearGradient>
          </View>

          <View className=" w-full h-[85%] flex flex-col justify-between px-5 py-10 rounded-t-3xl bg-white">
            <View className=" flex felx-col gap-4">
              <View className=" flex flex-col gap-2">
                <Text className="font-bold text-3xl">Hello Again! 👋</Text>
                <Text className="text-gray">
                  We're happy to see you back! Please enter your credentials to
                  continue your journey with us.
                </Text>
              </View>
              <View className=" flex flex-col gap-3">
                <Text className=" text-xl font-semibold text-gray">Email:</Text>
                <TextInput
                  className=" bg-zinc-100 px-4 py-4 rounded-lg text-lg"
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
              <TouchableOpacity onPress={onSubmit} className=" ">
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
                  {loader ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text className="text-white font-bold text-center text-xl">
                      Login
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View className=" my-3">
              <View className="">
                <Text className=" text-gray text-lg text-center">
                  Don't have an account?
                </Text>
                <TouchableOpacity
                  onPress={() => router.push("/BuyerAuth/SignUp")}
                >
                  <Text className=" text-lg text-primaryBlue text-center">
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#4c71dc" style="auto" />
    </SafeAreaView>
  );
};

export default Login;
