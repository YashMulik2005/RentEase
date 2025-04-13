import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import useAuth from "../../context/AuthContext";
import { postMethod } from "../../utils/apiService";

const Room = () => {
  const router = useRouter();
  const { token } = useAuth();
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("Economy");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [availabilityStatus, setAvailabilityStatus] = useState("Available");
  const [titleImage, setTitleImage] = useState("");
  const [images, setImages] = useState([]);
  const [options, setOptions] = useState([{ name: "" }]);

  const pickImage = async (type = "gallery", forTitle = false) => {
    let result;

    if (type === "camera") {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        alert("Permission to access camera is required!");
        return;
      }

      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
    } else {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        alert("Permission to access gallery is required!");
        return;
      }

      result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: !forTitle,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
    }

    if (!result.canceled) {
      if (forTitle) {
        const uri = result.assets[0].uri;
        setTitleImage(uri);
      } else {
        const selectedUris = result.assets.map((asset) => asset.uri);
        setImages((prev) => [...prev, ...selectedUris]);
      }
    }
  };

  const handleSubmit = async () => {
    const ownerString = await AsyncStorage.getItem("owner");
    const owner = JSON.parse(ownerString);
    console.log(owner._id);
    console.log(owner.hotelName);
    console.log("token", token);

    console.log("Uploading images to Cloudinary...");

    const uploadedImageUrls = [];
    let uploadedTitleImageUrl = "";

    for (let uri of images) {
      const file = {
        uri,
        type: "image/jpeg",
        name: `room-${Date.now()}.jpg`,
      };

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "vidify_image_preset");
      data.append("cloud_name", "dsq6bfksv");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dsq6bfksv/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const result = await res.json();
        uploadedImageUrls.push(result.secure_url);
      } catch (error) {
        console.error("Room image upload failed:", error);
      }
    }

    if (titleImage) {
      const file = {
        uri: titleImage,
        type: "image/jpeg",
        name: `title-${Date.now()}.jpg`,
      };

      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "vidify_image_preset");
      data.append("cloud_name", "dsq6bfksv");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dsq6bfksv/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const result = await res.json();
        uploadedTitleImageUrl = result.secure_url;
      } catch (error) {
        console.error("Title image upload failed:", error);
      }
    }

    const data = {
      owner_id: owner._id,
      room_number: parseInt(roomNumber),
      room_type: roomType,
      price: parseFloat(price),
      capacity: parseInt(capacity),
      description,
      availability_status: availabilityStatus,
      images: uploadedImageUrls,
      titleImage: uploadedTitleImageUrl,
      options: options.map((opt) => ({ name: opt.name })),
    };

    console.log("Final Room Data:", data);

    const res = await postMethod("room", data, token);
    console.log(res);

    if (res.data) {
      alert("Room created successfully!");

      setRoomNumber("");
      setRoomType("Economy");
      setPrice("");
      setCapacity("");
      setDescription("");
      setAvailabilityStatus("Available");
      setTitleImage("");
      setImages([]);
      setOptions([{ name: "" }]);
      router.push("/SellerTabs/Create");
    } else {
      const error = await res.json();
      alert(`Failed to create room: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      <ScrollView className="space-y-4" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="w-full flex flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-1 rounded-lg border border-zinc-300 w-[10%]"
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <View className="w-[80%]">
            <Text className="text-2xl font-bold text-center">
              Create new Room
            </Text>
          </View>
          <View className="w-[10%]" />
        </View>

        {/* Room Inputs */}
        {[
          {
            label: "Room Number",
            value: roomNumber,
            setValue: setRoomNumber,
            keyboardType: "numeric",
          },
          {
            label: "Prices/day",
            value: price,
            setValue: setPrice,
            keyboardType: "numeric",
          },
          {
            label: "Capacity",
            value: capacity,
            setValue: setCapacity,
            keyboardType: "numeric",
          },
        ].map((item, idx) => (
          <View key={idx} className="flex flex-col gap-2">
            <Text className="text-lg font-semibold text-gray-700">
              {item.label}:
            </Text>
            <TextInput
              placeholder={`Enter ${item.label.toLowerCase()}`}
              keyboardType={item.keyboardType}
              value={item.value}
              onChangeText={item.setValue}
              className="border border-gray-300 px-4 py-3 rounded-lg text-lg"
            />
          </View>
        ))}

        {/* Room Type Picker */}
        <View className="flex flex-col gap-1">
          <Text className="text-lg font-semibold text-gray-700">
            Room Type:
          </Text>
          <View className="border border-gray-300 rounded-lg">
            <Picker selectedValue={roomType} onValueChange={setRoomType}>
              <Picker.Item label="Economy" value="Economy" />
              <Picker.Item label="Deluxe" value="Deluxe" />
              <Picker.Item label="Executive" value="Executive" />
              <Picker.Item label="Suite" value="Suite" />
            </Picker>
          </View>
        </View>

        {/* Title Image Picker */}
        <Text className="text-lg font-semibold text-gray-700">
          Title Image:
        </Text>
        {titleImage ? (
          <View className="relative mb-2 mt-1">
            <Image
              source={{ uri: titleImage }}
              className="h-40 w-full rounded-xl"
            />
            <TouchableOpacity
              className="absolute top-2 right-2 bg-red-600 rounded-full p-1"
              onPress={() => setTitleImage("")}
            >
              <AntDesign name="close" size={15} color="white" />
            </TouchableOpacity>
          </View>
        ) : null}
        <View className="flex-row justify-between gap-3">
          <TouchableOpacity
            className="flex-1 bg-blue-500 p-3 rounded-lg"
            onPress={() => pickImage("gallery", true)}
          >
            <Text className="text-white text-center font-semibold">
              Pick from Gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-green-500 p-3 rounded-lg"
            onPress={() => pickImage("camera", true)}
          >
            <Text className="text-white text-center font-semibold">
              Take Photo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Room Images Picker */}
        <Text className="text-lg font-semibold text-gray-700">
          Room Images:
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {images.map((img, idx) => (
            <View key={idx} className="relative mb-2 mt-1">
              <Image source={{ uri: img }} className="h-24 w-24 rounded-lg" />
              <TouchableOpacity
                onPress={() => {
                  const updatedImages = [...images];
                  updatedImages.splice(idx, 1);
                  setImages(updatedImages);
                }}
                className="absolute top-1 right-1 bg-red-600 rounded-full p-1"
              >
                <AntDesign name="close" size={12} color="white" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View className="flex-row justify-between gap-3">
          <TouchableOpacity
            className="flex-1 bg-blue-500 p-3 rounded-lg"
            onPress={() => pickImage("gallery", false)}
          >
            <Text className="text-white text-center font-semibold">
              Pick from Gallery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 bg-green-500 p-3 rounded-lg"
            onPress={() => pickImage("camera", false)}
          >
            <Text className="text-white text-center font-semibold">
              Take Photo
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View className="flex flex-col gap-1">
          <Text className="text-lg font-semibold text-gray-700">
            Description:
          </Text>
          <TextInput
            placeholder="Enter description"
            multiline
            value={description}
            onChangeText={setDescription}
            className="border border-gray-300 px-4 py-3 rounded-lg text-lg"
          />
        </View>

        {/* Options */}
        <Text className="text-lg font-semibold text-gray-700 mt-2">
          Options:
        </Text>
        {options.map((option, index) => (
          <View key={index} className="mb-4 p-2 rounded-lg">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="font-semibold">Option {index + 1}</Text>
              <TouchableOpacity
                onPress={() => {
                  const updated = [...options];
                  updated.splice(index, 1);
                  setOptions(updated);
                }}
              >
                <AntDesign name="delete" size={20} color="red" />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder="Option Name (e.g. WiFi)"
              value={option.name}
              onChangeText={(text) => {
                const updated = [...options];
                updated[index].name = text;
                setOptions(updated);
              }}
              className="border border-gray-300 px-4 py-2 rounded-lg"
            />
          </View>
        ))}
        <TouchableOpacity
          onPress={() => setOptions([...options, { name: "" }])}
          className="bg-indigo-500 p-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">
            + Add Option
          </Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit}>
          <LinearGradient
            colors={["#4c71dc", "#4c65dc", "#4C4DDC"]}
            style={{
              padding: 10,
              paddingHorizontal: 20,
              borderRadius: 10,
              alignItems: "center",
              marginTop: 20,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Create Room
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Room;
