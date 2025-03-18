import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import * as Print from "expo-print";
import { Alert, Platform } from "react-native";
import * as Permissions from "expo-permissions";
import * as DocumentPicker from "expo-document-picker";
import * as IntentLauncher from "expo-intent-launcher";

const BookingCard = ({ data }) => {
  const [downloading, setDownloading] = useState(false);
  const [receiptHTML, setreceiptHTML] = useState(null);

  const DownloadReceipt = async () => {
    setDownloading(true);

    try {
      const res = await axios.post(
        "https://rent-ease-bcakend-v2.vercel.app/api/booking/receipt",
        { booking: data }
      );

      const receiptHTML = res?.data;

      if (!receiptHTML) {
        Alert.alert("Error", "Failed to generate receipt.");
        setDownloading(false);
        return;
      }

      const { uri } = await Print.printToFileAsync({
        html: receiptHTML,
        base64: false,
      });

      console.log("Generated PDF URI:", uri);

      const fileName = `${data?._id}_receipt.pdf`;

      if (Platform.OS === "android") {
        const permissions =
          await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

        if (!permissions.granted) {
          Alert.alert(
            "Permission Denied",
            "Cannot save the file without permission."
          );
          return;
        }
        const directoryUri = permissions.directoryUri;
        await FileSystem.StorageAccessFramework.createFileAsync(
          directoryUri,
          fileName,
          "application/pdf"
        )
          .then(async (newUri) => {
            await FileSystem.writeAsStringAsync(
              newUri,
              await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
              }),
              {
                encoding: FileSystem.EncodingType.Base64,
              }
            );
            Alert.alert("Success", "Receipt saved to Documents.");
          })
          .catch((err) => console.error("Error saving file:", err));
      } else {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Save Receipt",
        });
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong while downloading.");
    } finally {
      setDownloading(false);
    }
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
            disabled={downloading}
            className={`${
              downloading ? "bg-gray-400" : "bg-primaryBlue"
            } p-2 rounded-3xl`}
          >
            <Text className="text-white font-semibold text-center">
              {downloading ? "Loading..." : "Receipt"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;
