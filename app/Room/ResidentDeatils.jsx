import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { ScrollView } from "react-native-virtualized-view";
import { Dropdown } from "react-native-element-dropdown";
import { router } from "expo-router";
// import { Calendar } from "react-native-calendars";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const ResidentDeatils = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [residents, setResidents] = useState([]);
  const [currentResident, setCurrentResident] = useState({
    name: "",
    age: "",
    gender: "",
  });
  const [paymentModal, setpaymentModal] = useState(false);
  const [couponCode, setcouponCode] = useState("");

  const genderData = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const addResident = () => {
    if (currentResident.name && currentResident.age && currentResident.gender) {
      setResidents([...residents, currentResident]);
      setCurrentResident({ name: "", age: "", gender: "" });
    } else {
      alert("Please fill all the fields before adding a resident.");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="p-4 h-full w-full flex flex-col">
        <View className="w-full h-[90%] flex flex-col">
          {/* Render form fields for the current resident */}
          <View className=" w-full h-[30%]">
            <View className="mb-2">
              <Text className="text-lg font-semibold text-gray my-1">
                Name:
              </Text>
              <TextInput
                className="border border-gray px-4 py-3 rounded-lg text-lg"
                value={currentResident.name}
                onChangeText={(text) =>
                  setCurrentResident({ ...currentResident, name: text })
                }
                placeholder="username"
              />
            </View>
            <View className="flex flex-row gap-3 w-full">
              <View className="flex flex-col gap-3 w-[48%]">
                <Text className="text-lg font-semibold text-gray">Age:</Text>
                <TextInput
                  className="border border-gray px-4 py-3 rounded-lg text-lg"
                  keyboardType="numeric"
                  value={currentResident.age}
                  onChangeText={(text) =>
                    setCurrentResident({ ...currentResident, age: text })
                  }
                  placeholder="Age"
                />
              </View>
              <View className="flex flex-col gap-3 w-[48%]">
                <Text className="text-lg font-semibold text-gray">Gender:</Text>
                <Dropdown
                  data={genderData}
                  labelField="label"
                  valueField="value"
                  placeholder="Select gender"
                  value={currentResident.gender}
                  onChange={(item) =>
                    setCurrentResident({
                      ...currentResident,
                      gender: item.value,
                    })
                  }
                  style={{
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 8,
                    paddingHorizontal: 10,
                    paddingVertical: 12,
                    fontSize: 14,
                  }}
                  placeholderStyle={{
                    color: "gray",
                    fontSize: 14,
                  }}
                />
              </View>
            </View>
            {/* Button to add a new resident */}
            <TouchableOpacity
              onPress={addResident}
              className="bg-primaryBlue p-3 my-2 rounded-lg items-center"
            >
              <Text className="text-white font-bold text-lg">Add Resident</Text>
            </TouchableOpacity>
          </View>

          {/* Render all added residents */}
          <View className="mt-4 h-[70%]">
            <ScrollView>
              <Text className="text-xl font-semibold text-gray">
                Residents:
              </Text>
              {residents.length > 0 ? (
                residents.map((resident, index) => (
                  <View key={index} className="mb-2">
                    <Text className=" text-lg">Name: {resident.name}</Text>
                    <Text className=" text-lg">Age: {resident.age}</Text>
                    <Text className=" text-lg">Gender: {resident.gender}</Text>
                  </View>
                ))
              ) : (
                <Text>No residents added yet.</Text>
              )}
            </ScrollView>
          </View>
        </View>

        <View className="w-full h-[10%] flex flex-col justify-center items-center">
          <TouchableOpacity
            onPress={() => setpaymentModal(true)}
            className="w-full bg-primaryBlue p-3 my-2 items-center rounded-lg"
          >
            <Text className="text-white font-bold text-lg">Make payment</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={paymentModal}
        animationType="slide"
        transparent={true}
        className=" relative"
        onRequestClose={() => setpaymentModal(false)}
        presentationStyle="pageSheet"
      >
        <View className=" w-full p-5 absolute bottom-0 bg-tabBackground">
          <View className=" flex flex-row justify-end w-full">
            <TouchableOpacity
              onPress={() => setpaymentModal(false)}
              className=" my-1"
            >
              {/* <Text>cancel</Text> */}
              <MaterialIcons name="cancel" size={27} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <View className=" flex flex-col gap-2">
              <View className=" flex flex-row justify-between">
                <Text className=" text-xl font-bold">Hotel charge:</Text>
                <Text className=" text-xl font-bold text-primaryBlue">
                  4500 ₹
                </Text>
              </View>
              <View className=" flex flex-row justify-between">
                <Text className=" text-xl font-bold">Tax:</Text>
                <Text className=" text-xl font-bold text-primaryBlue">
                  4500 ₹
                </Text>
              </View>
              <View className=" flex flex-row justify-between">
                <Text className=" text-xl font-bold">platfrom charges:</Text>
                <Text className=" text-xl font-bold text-primaryBlue">
                  4500 ₹
                </Text>
              </View>
              <View className=" flex flex-row justify-between">
                <Text className=" text-xl font-bold">Total:</Text>
                <Text className=" text-xl font-bold text-primaryBlue">
                  8000 ₹
                </Text>
              </View>
            </View>
            <View className=" my-2">
              <View className="mb-2">
                <Text className="text-lg font-semibold text-gray my-[6px]">
                  Apply Coupon:
                </Text>
                <TextInput
                  className="border border-gray px-4 py-3 rounded-lg text-lg"
                  value={currentResident.name}
                  onChangeText={(text) => setcouponCode(text)}
                  placeholder="Coupon Code"
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                router.push("../(tabs)/MyBookin");
              }}
              className="w-full bg-primaryBlue p-3 my-2 items-center rounded-lg"
            >
              <Text className="text-white font-bold text-lg">Pay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ResidentDeatils;
