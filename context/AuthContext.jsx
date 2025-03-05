import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setusername] = useState("Yash");
  const [location, setlocation] = useState(null);
  const [bookingDetails, setbookingDetails] = useState({});
  const [token, settoken] = useState(null);

  const getToken = async () => {
    const t = await AsyncStorage.getItem("token");
    settoken(t);
  };
  useEffect(() => {
    getToken();
  }, []);

  const values = {
    username,
    setusername,
    location,
    setlocation,
    bookingDetails,
    setbookingDetails,
    token,
    settoken,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
