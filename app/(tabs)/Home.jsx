import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import { EvilIcons } from "@expo/vector-icons";
import FilterList from "../../components/FilterList";
import HotelCard from "../../components/HotelCard";
import axios from "axios";
import SearchCard from "../../components/SearchCard";
import useAuth from "../../context/AuthContext";
import { StatusBar } from "expo-status-bar";
import { getMethod } from "../../utils/apiService";
import { ScrollView } from "react-native-virtualized-view";

const Home = () => {
  // const { username } = useAuth();
  const [city, setCity] = useState("Unknown");
  const [country, setCountry] = useState("Unknown");
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationLoader, setlocationLoader] = useState(false);
  const { location, setlocation, username } = useAuth();
  const [radomRoomsData, setradomRoomsData] = useState();
  const [locationRooms, setlocationRooms] = useState();

  const checkPermissionAndGetLocation = async () => {
    setlocationLoader(true);
    const { status } = await Location.getForegroundPermissionsAsync();

    if (status === "granted") {
      getLocation();
    } else {
      const { status: newStatus } =
        await Location.requestForegroundPermissionsAsync();
      if (newStatus === "granted") {
        getLocation();
      } else {
        setErrorMsg("Permission to access location was denied");
      }
    }
  };

  const getLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;
      getCity(latitude, longitude);
    } catch (error) {
      console.error("Error getting location:", error.message);
      setErrorMsg("Unable to fetch location");
    }
  };

  const getCity = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lon}&key=95902c715dc643b0889465bcf24d0775`
      );
      const components = response.data.results[0]?.components;

      setlocation({
        city: components?.city || "Unknown city",
        state: components?.state || "Unknown country",
      });
      setlocationLoader(false);
    } catch (error) {
      console.error("Error fetching city information:", error);
      setErrorMsg("Unable to fetch city and country");
    }
  };

  useEffect(() => {
    if (location == null) {
      checkPermissionAndGetLocation();
    }
  }, []);

  const getRandomData = async () => {
    const res = await getMethod("room/random");
    setradomRoomsData(res.data);
  };

  const getRoomsByLocation = async () => {
    const res = await getMethod(
      `room/location/${location.city}/${location.state}`
    );
    setlocationRooms(res.data);
  };

  useEffect(() => {
    if (location != null) {
      getRandomData();
      getRoomsByLocation();
    }
  }, [location]);

  return (
    <SafeAreaView className=" bg-tabBackground h-full p-4 flex flex-col items-center gap-6">
      {locationLoader ? (
        <View className=" h-full w-full">
          <ActivityIndicator size="large" color="#4C4DDC" />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="  w-full h-screen"
        >
          <View className=" flex flex-col gap-4">
            <View className=" w-full flex flex-col justify-center gap-1 mt-3">
              <Text className=" text-gray pl-2">Current Location</Text>
              <View className=" flex gap-2 w-full flex-row items-center">
                <EvilIcons name="location" size={30} color="#4C4DDC" />
                <Text className=" text-xl font-bold">{`${location?.city}, ${location?.state}`}</Text>
              </View>
            </View>
            <View>
              <FilterList />
            </View>
            <View className=" w-full flex flex-col gap-3">
              <Text className=" text-xl font-bold pl-1">Near location</Text>
              <View>
                <FlatList
                  data={locationRooms}
                  keyExtractor={(item) => item?._id.toString()}
                  renderItem={({ item }) => <HotelCard data={item} />}
                  horizontal
                  // showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  //numColumns={2}
                />
              </View>
            </View>
            <View className=" w-full">
              <Text className="text-xl font-bold pl-1">Popular hotels</Text>
              <FlatList
                data={radomRoomsData}
                keyExtractor={(item) => item?._id.toString()}
                renderItem={({ item }) => <SearchCard data={item} />}
                showsVerticalScrollIndicator={false}
              />
            </View>
          </View>
        </ScrollView>
      )}
      <StatusBar style="drak" backgroundColor="#F5F5F6" />
    </SafeAreaView>
  );
};

export default Home;
