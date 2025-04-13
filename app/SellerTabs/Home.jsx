import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LineChart, ContributionGraph, BarChart } from "react-native-chart-kit";
import useAuth from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundGradientFrom: "#ffffff",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const commitsData = [
  { date: "2017-01-02", count: 1 },
  { date: "2017-01-03", count: 2 },
  { date: "2017-01-04", count: 3 },
  { date: "2017-01-05", count: 4 },
  { date: "2017-01-06", count: 5 },
  { date: "2017-01-30", count: 2 },
  { date: "2017-01-31", count: 3 },
  { date: "2017-03-01", count: 2 },
  { date: "2017-04-02", count: 4 },
  { date: "2017-03-05", count: 2 },
  { date: "2017-02-30", count: 4 },
];

const Home = () => {
  const {} = useAuth();
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ["Rainy Days"],
  };

  const Bardata = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("owner");
        if (userData) {
          setUser(JSON.parse(userData));
          console.log(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <SafeAreaView className=" w-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="bg-tabBackground w-full p-3 flex flex-col items-center">
          <View className="w-full flex flex-row justify-between mb-3 items-center">
            <Text className="font-bold text-xl">{user?.hotelName}</Text>
            <View className="h-11 w-11 rounded-full border">
              <Image
                source={{
                  uri: "https://img.freepik.com/free-photo/view-building-with-cartoon-style-architecture_23-2151154935.jpg?semt=ais_hybrid&w=740",
                }}
                className="h-full w-full rounded-full"
              />
            </View>
          </View>

          <View className="w-full">
            <LineChart
              data={data}
              width={screenWidth - 25}
              height={350}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            />
          </View>

          <View className="w-full flex flex-row gap-2 items-center mt-4">
            <View className="w-[49%] h-28  rounded-lg bg-white p-3">
              <Text className=" font-semibold text-lg">text 1234</Text>
              <Text className=" text-center my-2 font-bold text-3xl text-blue-700">
                2000
              </Text>
            </View>
            <View className="w-[49%] h-28 rounded-lg bg-white p-3">
              <Text className=" font-semibold text-lg">text 1234</Text>
              <Text className=" text-center my-2 font-bold text-3xl text-blue-700">
                2000
              </Text>
            </View>
          </View>

          <View className="w-full bg-white rounded-lg mt-4">
            <BarChart
              data={Bardata}
              width={screenWidth - 25}
              height={220}
              yAxisLabel="₹"
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" backgroundColor="#F5F5F6" />
    </SafeAreaView>
  );
};

export default Home;
