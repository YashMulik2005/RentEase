import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
  Alert,
  Linking,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Dropdown } from "react-native-element-dropdown";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useAuth from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postMethod } from "../../utils/apiService";
import { WebView } from "react-native-webview";

const ResidentDeatils = () => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [residents, setResidents] = useState([]);
  const [userData, setuserData] = useState();
  const [currentResident, setCurrentResident] = useState({
    name: "",
    age: "",
    gender: "",
  });

  const [paymentModal, setpaymentModal] = useState(false);
  const [couponCode, setcouponCode] = useState("");
  const { bookingDetails, setbookingDetails } = useAuth();
  const [amount, setAmount] = useState(bookingDetails?.amount || 0);
  const [tax, setTax] = useState((amount * 0.05).toFixed(2));
  const [platformCharge, setPlatformCharge] = useState(
    (amount * 0.01).toFixed(2)
  );
  const [totalAmount, setTotalAmount] = useState(
    (amount + parseFloat(tax) + parseFloat(platformCharge)).toFixed(2)
  );

  const [showRazorpay, setShowRazorpay] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  console.log(bookingDetails);
  const genderData = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  const addResident = () => {
    if (currentResident.name && currentResident.age && currentResident.gender) {
      const updatedResidents = [...residents, currentResident];
      setResidents(updatedResidents);

      setbookingDetails({
        ...bookingDetails,
        guest_details: updatedResidents,
      });

      setCurrentResident({ name: "", age: "", gender: "" });
      console.log("in function", bookingDetails);
    } else {
      alert("Please fill all the fields before adding a resident.");
    }
  };

  const GetUser = async () => {
    const user = await AsyncStorage.getItem("token");
    setuserData(user);
  };

  const generateOrderHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
        </head>
        <body>
          <script>
            const options = {
              key: 'rzp_test_3kPXwIYYdt9LSC',
              amount: ${Math.round(parseFloat(totalAmount) * 100)},
              currency: 'INR',
              name: 'HotelEase',
              description: 'Hotel Booking Payment',
              image: 'https://your-logo-url.png',
              prefill: {
                email: 'user@example.com',
                contact: '9999999999',
                name: 'User Name'
              },
              theme: {
                color: '#53a20e'
              },
              handler: function(response) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  status: 'success',
                  ...response
                }));
              },
              modal: {
                ondismiss: function() {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    status: 'dismissed'
                  }));
                }
              }
            };
            const rzp = new Razorpay(options);
            rzp.on('payment.failed', function(response) {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                status: 'failed',
                error: response.error
              }));
            });
            rzp.open();
          </script>
        </body>
      </html>
    `;
  };

  const handlePaymentResponse = async (response) => {
    try {
      const paymentData = JSON.parse(response);
      console.log("Payment Response:", paymentData);

      if (paymentData.status === "success" && paymentData.razorpay_payment_id) {
        // Payment successful
        const res = await postMethod(
          "booking",
          {
            ...bookingDetails,
            total_guests: bookingDetails.guest_details.length,
            amount: totalAmount,
            payment_id: paymentData.razorpay_payment_id,
          },
          userData
        );

        if (res.status == 201) {
          Alert.alert("Success", "Payment successful and room booked!");
          setShowRazorpay(false);
          setpaymentModal(false);
          router.push("../(tabs)/MyBookin");
        }
      } else if (paymentData.status === "failed") {
        Alert.alert(
          "Payment Failed",
          paymentData.error?.description || "Payment was unsuccessful"
        );
      } else if (paymentData.status === "dismissed") {
        Alert.alert("Payment Cancelled", "You cancelled the payment");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      Alert.alert("Error", "Payment processing failed. Please try again.");
    } finally {
      setPaymentProcessing(false);
    }
  };

  const startPayment = () => {
    if (!bookingDetails?.guest_details?.length) {
      Alert.alert(
        "Error",
        "Please add at least one resident before making payment"
      );
      return;
    }
    setShowRazorpay(true);
    setPaymentProcessing(true);
    setpaymentModal(false);
  };

  useEffect(() => {
    GetUser();
  }, []);

  return (
    <SafeAreaView className="bg-white h-full w-full">
      <View className="p-4 h-full w-full flex flex-col">
        <View className="w-full h-[90%] flex flex-col">
          <View className=" w-full h-[30%]">
            <View className="mb-2">
              <Text className="text-lg font-semibold text-gray my-1">
                Name:
              </Text>
              <TextInput
                className=" bg-zinc-100 px-4 py-4 rounded-lg text-lg"
                value={currentResident.name}
                onChangeText={(text) =>
                  setCurrentResident({ ...currentResident, name: text })
                }
                placeholder="Name"
              />
            </View>
            <View className="flex flex-row gap-3 w-full">
              <View className="flex flex-col gap-3 w-[48%]">
                <Text className="text-lg font-semibold text-gray">Age:</Text>
                <TextInput
                  className="bg-zinc-100 px-4 py-4 rounded-lg text-lg"
                  keyboardType="numeric"
                  value={currentResident.age}
                  onChangeText={(text) =>
                    setCurrentResident({
                      ...currentResident,
                      age: text,
                    })
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
                    borderColor: "#f4f4f5",
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
            <TouchableOpacity
              onPress={addResident}
              className="bg-primaryBlue p-3 my-2 rounded-lg items-center"
            >
              <Text className="text-white font-bold text-lg">Add Resident</Text>
            </TouchableOpacity>
          </View>

          <View className="mt-4 h-[70%]">
            <ScrollView>
              {residents.length > 0 && (
                <Text className="text-xl font-semibold text-gray">
                  Residents:
                </Text>
              )}
              {residents.length > 0 ? (
                residents.map((resident, index) => (
                  <View key={index} className="mb-2">
                    <Text className=" text-lg">Name: {resident.name}</Text>
                    <Text className=" text-lg">Age: {resident.age}</Text>
                    <Text className=" text-lg">Gender: {resident.gender}</Text>
                  </View>
                ))
              ) : (
                <Text></Text>
              )}
            </ScrollView>
          </View>
        </View>

        <View className="w-full h-[10%] flex flex-col justify-center items-center">
          <TouchableOpacity
            onPress={async () => {
              setbookingDetails({
                ...bookingDetails,
                total_guests: bookingDetails.guest_details.length,
                amount: totalAmount,
              });
              setpaymentModal(true);
            }}
            className="w-full bg-primaryBlue p-3 my-2 items-center rounded-lg"
          >
            <Text className="text-white font-bold text-lg">Make payment</Text>
          </TouchableOpacity>
        </View>
      </View>

      {showRazorpay && (
        <Modal
          visible={showRazorpay}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            if (!paymentProcessing) {
              setShowRazorpay(false);
            }
          }}
        >
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                padding: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  if (!paymentProcessing) {
                    setShowRazorpay(false);
                  }
                }}
              >
                <MaterialIcons name="close" size={30} color="black" />
              </TouchableOpacity>
            </View>
            <WebView
              source={{ html: generateOrderHTML() }}
              onMessage={(event) => {
                handlePaymentResponse(event.nativeEvent.data);
              }}
              onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn("WebView error: ", nativeEvent);
              }}
              onHttpError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn("WebView HTTP error: ", nativeEvent);
              }}
            />
          </View>
        </Modal>
      )}

      <Modal
        visible={paymentModal}
        animationType="slide"
        transparent={true}
        className="relative"
        onRequestClose={() => setpaymentModal(false)}
      >
        <View className="w-full p-5 absolute bottom-0 bg-tabBackground">
          <View className="flex flex-row justify-end w-full">
            <TouchableOpacity
              onPress={() => setpaymentModal(false)}
              className="my-2"
            >
              <MaterialIcons name="cancel" size={27} color="black" />
            </TouchableOpacity>
          </View>
          <View>
            <View className="flex flex-col gap-2">
              <View className="flex flex-row justify-between">
                <Text className="text-xl font-bold">Hotel charge:</Text>
                <Text className="text-xl font-bold text-primaryBlue">
                  {amount} ₹
                </Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-xl font-bold">
                  Tax <Text className="font-normal text-zinc-500">(5%) </Text>:
                </Text>
                <Text className="text-xl font-bold text-primaryBlue">
                  {tax} ₹
                </Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-xl font-bold">
                  Platform charges{" "}
                  <Text className="font-normal text-zinc-500">(1%) </Text>:
                </Text>
                <Text className="text-xl font-bold text-primaryBlue">
                  {platformCharge} ₹
                </Text>
              </View>
              <View className="flex flex-row justify-between">
                <Text className="text-xl font-bold">Total:</Text>
                <Text className="text-xl font-bold text-primaryBlue">
                  {totalAmount} ₹
                </Text>
              </View>
            </View>
            {/* <View className="my-2">
                      <View className="mb-2">
                        <Text className="text-lg font-semibold text-gray my-[6px]">
                          Apply Coupon:
                        </Text>
                        <TextInput
                          className="border border-gray px-4 py-3 rounded-lg text-lg"
                          value={couponCode}
                          onChangeText={(text) => setcouponCode(text)}
                          placeholder="Coupon Code"
                        />
                      </View>
                    </View> */}
            <TouchableOpacity
              onPress={startPayment}
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
