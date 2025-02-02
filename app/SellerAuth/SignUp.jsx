import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
// import { ScrollView } from "react-native-virtualized-view";

const SignUp = () => {
  return (
    <ScrollView className="" style={styles.fullScreen}>
      <SafeAreaView className=" h-full w-full flex flex-col justify-center p-4">
        <View className=" my-4">
          <Text className=" font-bold text-3xl">SignUp</Text>
          <Text className=" text-gray">Please fill in the credentials</Text>
        </View>
        <View className=" flex flex-col gap-2">
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
          <View className=" flex flex-col gap-3">
            <Text className=" text-xl font-semibold text-gray">Mobile No:</Text>
            <TextInput
              className=" border border-gray px-4 py-3 rounded-lg text-lg"
              keyboardType="phone-pad"
              placeholder="Mobile No"
            />
          </View>
          <View className=" flex flex-col gap-3">
            <Text className=" text-xl font-semibold text-gray">
              Hotel Name:
            </Text>
            <TextInput
              className=" border border-gray px-4 py-3 rounded-lg text-lg"
              keyboardType="ascii-capable"
              placeholder="Hotel Name"
            />
          </View>
          <View className=" flex flex-col gap-3">
            <Text className=" text-xl font-semibold text-gray">Apartment:</Text>
            <TextInput
              className=" border border-gray px-4 py-3 rounded-lg text-lg"
              keyboardType="ascii-capable"
              placeholder="Hotel Name"
            />
          </View>

          <View className=" flex flex-col gap-3">
            <Text className=" text-xl font-semibold text-gray">
              Street Address:
            </Text>
            <TextInput
              className=" border border-gray px-4 py-3 rounded-lg text-lg"
              keyboardType="ascii-capable"
              placeholder="Strret Address"
            />
          </View>

          <View className="flex flex-row gap-3 w-full">
            <View className=" flex flex-col gap-3 w-[48%]">
              <Text className=" text-xl font-semibold text-gray">City:</Text>
              <TextInput
                className=" border border-gray px-4 py-3 rounded-lg text-lg"
                keyboardType="ascii-capable"
                placeholder="City"
              />
            </View>
            <View className=" flex flex-col gap-3 w-[48%]">
              <Text className=" text-xl font-semibold text-gray">State:</Text>
              <TextInput
                className=" border border-gray px-4 py-3 rounded-lg text-lg"
                keyboardType="ascii-capable"
                placeholder="State"
              />
            </View>
          </View>
          <View className="flex flex-row gap-3 w-full">
            <View className=" flex flex-col gap-3 w-[48%]">
              <Text className=" text-xl font-semibold text-gray">
                Postal Code:
              </Text>
              <TextInput
                className=" border border-gray px-4 py-3 rounded-lg text-lg"
                keyboardType="ascii-capable"
                placeholder="Postal Code"
              />
            </View>
            <View className=" flex flex-col gap-3 w-[48%]">
              <Text className=" text-xl font-semibold text-gray">Country:</Text>
              <TextInput
                className=" border border-gray px-4 py-3 rounded-lg text-lg"
                keyboardType="ascii-capable"
                placeholder="Country"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              router.push("/BuyerTabs/Home");
            }}
            className=" bg-primaryBlue p-4 rounded-xl mt-2"
          >
            <Text className=" text-white font-bold text-center text-xl">
              SignUp
            </Text>
          </TouchableOpacity>
          <View className="">
            <Text className=" text-gray text-lg text-center">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/SellerAuth/SignUp")}>
              <Text className=" text-lg text-primaryBlue font-bold text-center">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  fullScreen: {
    height: "100%",
    width: "100%",
  },
});
