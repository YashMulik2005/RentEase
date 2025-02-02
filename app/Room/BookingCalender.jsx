import React, { useState } from "react";
import { View, Alert } from "react-native";
import { Calendar } from "react-native-calendars";

const BookingCalender = () => {
  const [selectedRange, setSelectedRange] = useState({});

  const bookedRanges = [
    { start: "2025-02-05", end: "2025-02-10" },
    { start: "2025-02-15", end: "2025-02-18" },
  ];

  const generateMarkedDates = () => {
    const markedDates = {};
    // Highlight booked ranges
    bookedRanges.forEach(({ start, end }) => {
      let date = new Date(start);
      while (date <= new Date(end)) {
        const formatted = date.toISOString().split("T")[0];
        markedDates[formatted] = {
          disabled: true,
          startingDay: formatted === start,
          endingDay: formatted === end,
          color: "red",
        };
        date.setDate(date.getDate() + 1);
      }
    });

    // Highlight user-selected dates
    Object.keys(selectedRange).forEach((date) => {
      markedDates[date] = {
        ...markedDates[date],
        color: "blue",
        startingDay: selectedRange[date]?.startingDay,
        endingDay: selectedRange[date]?.endingDay,
      };
    });

    return markedDates;
  };

  const handleDayPress = (day) => {
    const { dateString } = day;
    if (Object.keys(selectedRange).length === 0) {
      setSelectedRange({ [dateString]: { startingDay: true, color: "blue" } });
    } else {
      const firstDate = Object.keys(selectedRange)[0];
      if (new Date(firstDate) > new Date(dateString)) {
        Alert.alert("Invalid range", "End date must be after start date.");
      } else {
        const datesBetween = {};
        let date = new Date(firstDate);
        while (date <= new Date(dateString)) {
          const formatted = date.toISOString().split("T")[0];
          datesBetween[formatted] = { color: "blue" };
          date.setDate(date.getDate() + 1);
        }
        setSelectedRange(datesBetween);
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Calendar
        markingType={"period"}
        markedDates={generateMarkedDates()}
        onDayPress={handleDayPress}
      />
    </View>
  );
};

export default BookingCalender;
