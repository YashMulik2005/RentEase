import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment";
import useAuth from "../../context/AuthContext";
import { getMethod } from "../../utils/apiService";

const BookingCalender = () => {
  const [dates, setDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedCheckInDates, setbookedCheckInDates] = useState([]);
  const [bookedCheckOutDates, setbookedCheckOutDates] = useState([]);
  const { bookingDetails, setbookingDetails } = useAuth();
  const [loader, setloader] = useState(true);

  // const bookedCheckInDates = ["2025-02-15", "2025-02-20", "2025-02-28"];

  const getData = async () => {
    setloader(true);
    try {
      const res = await getMethod(`booking/room/${bookingDetails.room_id}`);
      const result = res?.data;
      setbookedCheckInDates(result?.checkInDates);
      setbookedCheckOutDates(result?.checkOutDates);
    } catch (err) {
      console.log(err);
    }
    setloader(false);
  };

  useEffect(() => {
    generateNextTwoMonths();
    getData();
    console.log(bookingDetails);
  }, []);

  const generateNextTwoMonths = () => {
    let tempDates = [];
    let currentDate = moment();
    let endDate = moment().add(2, "months");

    while (currentDate.isBefore(endDate)) {
      tempDates.push({
        date: currentDate.format("YYYY-MM-DD"),
        day: currentDate.format("ddd"),
      });
      currentDate.add(1, "day");
    }
    setDates(tempDates);
  };

  return (
    <SafeAreaView className="bg-white h-full w-full">
      {loader ? (
        <View>
          <Text>loading</Text>
        </View>
      ) : (
        <View className="p-4 h-full w-full flex flex-col items-center gap-6">
          <View className="w-full flex flex-row items-center">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-1 rounded-lg border border-zinc-300 w-[10%]"
            >
              <AntDesign name="left" size={24} color="black" />
            </TouchableOpacity>
            <View className="w-[80%]">
              <Text className="text-2xl font-bold text-center">Schedule</Text>
            </View>
            <View className="w-[10%]" />
          </View>
          <View className=" w-full h-full flex flex-col items-center justify-between">
            <View className=" w-full h-[86%]">
              <View className="w-full">
                <Text className="text-lg font-semibold mb-2">
                  Select Check-in Date
                </Text>
                <FlatList
                  data={dates}
                  horizontal
                  keyExtractor={(item) => item.date}
                  renderItem={({ item }) => {
                    const isBooked = bookedCheckInDates?.includes(item.date);
                    return (
                      <TouchableOpacity
                        onPress={() => !isBooked && setStartDate(item.date)}
                        disabled={isBooked}
                        className={`p-3 px-7 h-28 flex flex-col justify-center items-center m-1 rounded-full 
            ${
              isBooked
                ? "bg-gray opacity-70"
                : startDate === item.date
                ? "bg-[#4C4DDC]"
                : "bg-zinc-200"
            }`}
                      >
                        <Text
                          className={`${
                            startDate === item.date ? " text-white" : ""
                          } text-center text-xl`}
                        >
                          {item.date.split("-")[2]}
                        </Text>
                        <Text
                          className={`${
                            startDate === item.date ? " text-white" : ""
                          } text-center text-xl font-bold`}
                        >
                          {item.day}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />

                <Text className="text-lg font-semibold mt-4 mb-2">
                  Select Check-out Date
                </Text>
                <FlatList
                  data={dates}
                  horizontal
                  keyExtractor={(item) => item.date}
                  renderItem={({ item }) => {
                    const isBooked = bookedCheckOutDates?.includes(item.date);
                    const isBeforeCheckIn =
                      startDate &&
                      moment(item.date).isBefore(moment(startDate));

                    return (
                      <TouchableOpacity
                        onPress={() =>
                          !isBooked && !isBeforeCheckIn && setEndDate(item.date)
                        }
                        disabled={isBooked || isBeforeCheckIn}
                        className={`p-3 px-7 h-28 flex flex-col justify-center items-center m-1 rounded-full
    ${isBooked || isBeforeCheckIn ? "bg-gray opacity-70" : ""}
    ${
      !isBooked && !isBeforeCheckIn && endDate === item.date
        ? "bg-[#4C4DDC] text-white"
        : ""
    }
    ${
      !isBooked && !isBeforeCheckIn && endDate !== item.date
        ? "bg-zinc-200"
        : ""
    }`}
                      >
                        <Text
                          className={`${
                            endDate === item.date ? " text-white" : ""
                          } text-center text-xl`}
                        >
                          {item.date.split("-")[2]}
                        </Text>
                        <Text
                          className={`${
                            endDate === item.date ? " text-white" : ""
                          } text-center text-xl`}
                        >
                          {item.day}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>

            <View className="w-full h-[14%]">
              <TouchableOpacity
                onPress={() => {
                  const diff = moment(endDate).diff(moment(startDate), "days");
                  const newamount = (diff + 1) * bookingDetails.amount;
                  setbookingDetails({
                    ...bookingDetails,
                    check_in_date: startDate,
                    check_out_date: endDate,
                    amount: newamount,
                  });
                  router.push("./ResidentDeatils");
                }}
                className=" w-full bg-primaryBlue p-3 my-2 items-center rounded-lg"
              >
                <Text className="text-white font-bold text-lg">Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default BookingCalender;
