import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from "react-native";
import React from "react";
import moment from "moment";
import { getMethod } from "../utils/apiService";

const BookingCard = ({ data }) => {
  const DownloadReceipt = async (receiptId) => {
    // try {
    //   const receiptUrl = `https://your-api-url.com/booking/receipt/${receiptId}`;
    //   const fileUri = FileSystem.documentDirectory + "receipt.pdf";
    //   const { uri } = await FileSystem.downloadAsync(receiptUrl, fileUri);
    //   if (await Sharing.isAvailableAsync()) {
    //     await Sharing.shareAsync(uri);
    //   } else {
    //     Alert.alert("Downloaded", "Receipt saved at: " + uri);
    //   }
    // } catch (error) {
    //   Alert.alert("Error", "Failed to download receipt.");
    //   console.error(error);
    // }
  };

  return (
    <TouchableOpacity className="bg-white w-full rounded-lg flex flex-col p-4 my-2">
      <View className="w-full flex flex-row gap-4">
        <View className="w-[15%]">
          <Image
            className="h-16 aspect-square rounded-lg"
            source={{ uri: data?.room_id?.titleImage }}
          />
        </View>
        <View className="w-[85%]">
          <Text className=" font-semibold text-lg">
            {data?.room_id?.owner_id?.hotelName}
          </Text>
          <Text className=" text-gray font-semibold">
            Start From:
            <Text className=" text-green-800">
              {moment(data?.check_in_date).format("DD-MM-YYYY")}
            </Text>
          </Text>
        </View>
      </View>

      <View className="w-full h-[1px] bg-zinc-300 mt-2"></View>
      <View className="w-full mt-2 flex flex-row gap-1">
        <View className=" w-[80%] flex flex-col gap-1">
          <Text className=" text-gray font-semibold">
            Address:{" "}
            <Text className=" text-black">
              {data?.room_id?.owner_id?.apartment},{" "}
              {data?.room_id?.owner_id?.streetName},{" "}
              {data?.room_id?.owner_id?.city},{data?.room_id?.owner_id?.state}
            </Text>
          </Text>
          <Text className=" text-gray font-semibold">
            Duration:{" "}
            <Text className=" text-black">
              {moment(data?.check_out_date).diff(
                moment(data?.check_in_date),
                "days"
              ) + 1}{" "}
              Days
            </Text>
          </Text>
        </View>
        <View className=" w-[20%] flex flex-col justify-end">
          <TouchableOpacity
            onPress={DownloadReceipt}
            className=" bg-primaryBlue p-2 rounded-3xl"
          >
            <Text className="text-white font-semibold text-center">
              Recepit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;
