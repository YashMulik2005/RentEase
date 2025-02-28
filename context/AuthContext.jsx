import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setusername] = useState("Yash");
  const [location, setlocation] = useState(null);
  const [bookingDetails, setbookingDetails] = useState({});

  const values = {
    username,
    setusername,
    location,
    setlocation,
    bookingDetails,
    setbookingDetails,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
