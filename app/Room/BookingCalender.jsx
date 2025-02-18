<<<<<<< HEAD
import { View, Text } from "react-native";
import React from "react";

const BookingCalender = () => {
  return (
    <View>
      <Text>BookingCalender</Text>
    </View>
=======
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Calendar } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";
import CalendarPicker from "react-native-calendar-picker";
import { router } from "expo-router";
import OfferCard from "../../components/OfferCard";
import { ScrollView } from "react-native-virtualized-view";

const BookingCalender = () => {
  const onDateChange = (date, type) => {
    console.log(JSON.stringify(date));
  };
  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className=" p-4 h-full w-full flex flex-col items-center gap-6">
        <View className="w-full flex flex-row items-center">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
            className="p-1 rounded-lg border border-zinc-300 w-[10%]"
          >
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <View className=" w-[80%]">
            <Text className=" text-2xl font-bold text-center">Schedule</Text>
          </View>
          <View className="w-[10%]">{/* <Text>nibu</Text> */}</View>
        </View>

        <View className=" w-full h-full">
          <ScrollView>
            <View className="w-full p-4 rounded-lg bg-tabBackground">
              {/* <Calendar
            style={{
              borderRadius: 10,
              elevation: 4,
              backgroundColor: "#F5F5F6",
            }}
            minDate="2025-02-15"
            markedDates={{
              "2025-02-17": {
                selected: true,
                marked: true,
                selectedColor: "#5C67F2",
              },
              "2024-09-25": {
                selected: true,
                marked: true,
                selectedColor: "#5C67F2",
              },
            }}
            theme={{
              textSectionTitleColor: "#5C67F2",
              selectedDayBackgroundColor: "#5C67F2",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#5C67F2",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              arrowColor: "#5C67F2",
              monthTextColor: "#5C67F2",
              indicatorColor: "#5C67F2",
              textDayFontWeight: "300",
              textMonthFontWeight: "bold",
              textDayHeaderFontWeight: "500",
              textDayFontSize: 16,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,
            }}
          /> */}
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={new Date()}
                // maxDate={maxDate}
                selectedDayColor="#4C4DDC"
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
                backgroundColor="#F5F5F6"
                disabledDates={["2025-02-22", "2025-02-23"]}
                // previousTitle="<"
                // nextTitle=">"
              />
            </View>

            <View>
              <Text className=" font-bold text-lg mb-2">Offers available</Text>
              <OfferCard />
              <OfferCard />
            </View>

            <TouchableOpacity
              onPress={() => router.push("./ResidentDeatils")}
              className="w-full  bg-primaryBlue p-3 my-2 items-center rounded-lg"
            >
              <Text className=" text-white font-bold text-lg">Booking Now</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
>>>>>>> 143b171605fb01fa0ec76433a96a3c98e63a8ac0
  );
};

export default BookingCalender;
