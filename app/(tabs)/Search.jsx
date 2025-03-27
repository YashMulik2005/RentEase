import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import SearchCard from "../../components/SearchCard";
import { getMethod } from "../../utils/apiService";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";
import NoDataCard from "../../components/NoDataCard";
import { StatusBar } from "expo-status-bar";

const states = [
  { label: "Andhra Pradesh", value: "andhra_pradesh" },
  { label: "Arunachal Pradesh", value: "arunachal_pradesh" },
  { label: "Assam", value: "assam" },
  { label: "Bihar", value: "bihar" },
  { label: "Chhattisgarh", value: "chhattisgarh" },
  { label: "Goa", value: "goa" },
  { label: "Gujarat", value: "gujarat" },
  { label: "Haryana", value: "haryana" },
  { label: "Himachal Pradesh", value: "himachal_pradesh" },
  { label: "Jharkhand", value: "jharkhand" },
  { label: "Karnataka", value: "karnataka" },
  { label: "Kerala", value: "kerala" },
  { label: "Madhya Pradesh", value: "madhya_pradesh" },
  { label: "Maharashtra", value: "maharashtra" },
  { label: "Manipur", value: "manipur" },
  { label: "Meghalaya", value: "meghalaya" },
  { label: "Mizoram", value: "mizoram" },
  { label: "Nagaland", value: "nagaland" },
  { label: "Odisha", value: "odisha" },
  { label: "Punjab", value: "punjab" },
  { label: "Rajasthan", value: "rajasthan" },
  { label: "Sikkim", value: "sikkim" },
  { label: "Tamil Nadu", value: "tamil_nadu" },
  { label: "Telangana", value: "telangana" },
  { label: "Tripura", value: "tripura" },
  { label: "Uttar Pradesh", value: "uttar_pradesh" },
  { label: "Uttarakhand", value: "uttarakhand" },
  { label: "West Bengal", value: "west_bengal" },
];

const cities = [
  { label: "Mumbai", value: "mumbai" },
  { label: "Delhi", value: "delhi" },
  { label: "Bangalore", value: "bangalore" },
  { label: "Hyderabad", value: "hyderabad" },
  { label: "Ahmedabad", value: "ahmedabad" },
  { label: "Chennai", value: "chennai" },
  { label: "Kolkata", value: "kolkata" },
  { label: "Surat", value: "surat" },
  { label: "Pune", value: "pune" },
  { label: "Jaipur", value: "jaipur" },
  { label: "Lucknow", value: "lucknow" },
  { label: "Kanpur", value: "kanpur" },
  { label: "Nagpur", value: "nagpur" },
  { label: "Indore", value: "indore" },
  { label: "Thane", value: "thane" },
  { label: "Bhopal", value: "bhopal" },
  { label: "Visakhapatnam", value: "visakhapatnam" },
  { label: "Pimpri-Chinchwad", value: "pimpri_chinchwad" },
  { label: "Patna", value: "patna" },
  { label: "Vadodara", value: "vadodara" },
  { label: "Ghaziabad", value: "ghaziabad" },
  { label: "Ludhiana", value: "ludhiana" },
  { label: "Agra", value: "agra" },
  { label: "Nashik", value: "nashik" },
  { label: "Faridabad", value: "faridabad" },
  { label: "Meerut", value: "meerut" },
  { label: "Rajkot", value: "rajkot" },
  { label: "Kalyan-Dombivli", value: "kalyan_dombivli" },
  { label: "Vasai-Virar", value: "vasai_virar" },
  { label: "Varanasi", value: "varanasi" },
];

const Search = () => {
  const router = useRouter();
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch search results
  const handleSearch = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        ...(city && { city }),
        ...(state && { state }),
        ...(minPrice && { minPrice }),
        ...(maxPrice && { maxPrice }),
      }).toString();

      const response = await getMethod(`room/search?${queryParams}`);
      console.log(response?.data);
      setResults(response?.data || []);
    } catch (error) {
      console.error("Search API Error:", error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="bg-tabBackground h-full w-full p-4 flex flex-col items-center gap-4">
      <View className="w-full flex flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="p-1 rounded-lg border border-zinc-300 w-[10%]"
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <View className="w-[80%]">
          <Text className="text-2xl font-bold text-center">Search</Text>
        </View>
        <View className="w-[10%]" />
      </View>

      {/* City & State Dropdowns */}
      <View className="w-full flex flex-col gap-2">
        <Dropdown
          data={cities}
          labelField="label"
          valueField="value"
          placeholder="Select city"
          value={city}
          onChange={(item) => setCity(item.value)}
          style={{
            borderColor: "#e4e4e7",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 12,
            fontSize: 14,
            backgroundColor: "#e4e4e7",
          }}
          placeholderStyle={{
            color: "black",
            fontSize: 14,
          }}
        />

        <Dropdown
          data={states}
          labelField="label"
          valueField="value"
          placeholder="Select state"
          value={state}
          onChange={(item) => setState(item.value)}
          style={{
            borderColor: "#e4e4e7",
            borderWidth: 1,
            borderRadius: 8,
            paddingHorizontal: 10,
            paddingVertical: 12,
            fontSize: 14,
            backgroundColor: "#e4e4e7",
          }}
          placeholderStyle={{
            color: "black",
            fontSize: 14,
          }}
        />
      </View>

      {/* Min/Max Price Inputs */}
      <View className="w-full flex flex-row justify-between gap-2">
        <TextInput
          className="flex-1 bg-zinc-200 px-4 py-3 rounded-lg text-lg"
          placeholder="Min Price"
          keyboardType="numeric"
          value={minPrice}
          onChangeText={setMinPrice}
        />
        <TextInput
          className="flex-1 bg-zinc-200 px-4 py-3 rounded-lg text-lg"
          placeholder="Max Price"
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={setMaxPrice}
        />
      </View>

      {/* Search Button */}
      <TouchableOpacity
        onPress={handleSearch}
        className="w-full bg-primaryBlue p-3 items-center rounded-lg"
      >
        <Text className="text-white font-bold text-lg">Search</Text>
      </TouchableOpacity>

      <View className="w-full">
        <Text className="text-xl font-semibold">Results</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#4C4DDC" className="mt-4" />
        ) : results ? (
          results.length > 0 ? (
            <FlatList
              data={results}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <SearchCard data={item} />}
            />
          ) : (
            <NoDataCard />
          )
        ) : null}
      </View>
      <StatusBar style="dark" backgroundColor="#F5F5F6" />
    </SafeAreaView>
  );
};

export default Search;
