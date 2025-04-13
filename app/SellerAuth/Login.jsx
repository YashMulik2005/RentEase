import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import axios from "axios";
import useAuth from "../../context/AuthContext";
import { getMethod, postMethod } from "../../utils/apiService";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { setlocation, token, settoken } = useAuth();
  const [loader, setloader] = useState(false);

  const onSubmit = async () => {
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    setloader(true);

    try {
      // const response = await axios.post("https://your-api-url.com/api/login", {
      //   email,
      //   password,
      // });

      const response = await postMethod("auth/ownerlogin", {
        email: email,
        password: password,
      });

      if (response.data?.token) {
        const result = await getMethod("user/getowner", response?.data?.token);
        settoken(response?.data?.token);
        await AsyncStorage.setItem("token", response?.data?.token);
        await AsyncStorage.removeItem("user");
        await AsyncStorage.setItem("owner", JSON.stringify(result?.data));
        setlocation(null);
        router.push("SellerTabs/Home");
      } else {
        alert("Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setloader(false);
    }
  };

  return (
    <SafeAreaView className="relative flex justify-center p-5 h-full w-full gap-3">
      <View>
        <Text className="font-bold text-3xl">Login</Text>
        <Text className="text-gray">Please fill in the credentials</Text>
      </View>

      <View className="flex flex-col gap-3">
        <Text className="text-xl font-semibold text-gray">Email:</Text>
        <TextInput
          value={email}
          onChangeText={setemail}
          className="border border-gray px-4 py-3 rounded-lg text-lg"
          keyboardType="email-address"
          placeholder="email"
        />
      </View>

      <View className="flex flex-col gap-3 my-2">
        <Text className="text-xl font-semibold text-gray">Password:</Text>
        <TextInput
          value={password}
          onChangeText={setpassword}
          className="border border-gray px-4 py-3 rounded-lg text-lg"
          keyboardType="default"
          placeholder="password"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        onPress={onSubmit}
        disabled={loader}
        className="bg-primaryBlue p-4 rounded-xl flex justify-center items-center"
      >
        {loader ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-center text-xl">
            Login
          </Text>
        )}
      </TouchableOpacity>

      <View>
        <Text className="text-gray text-lg text-center">
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/SellerAuth/SignUp")}>
          <Text className="text-lg text-primaryBlue font-bold text-center">
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
