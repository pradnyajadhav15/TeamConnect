import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import server from "../environment";

export const AuthContext = createContext({});

const client = axios.create({
  baseURL: `${server}/api/users`,
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const response = await client.post("/register", { name, username, password });

      // Assuming backend returns { message: "User registered successfully" } on success
      if (response.status === 200 || response.status === 201) {
        return response.data.message || "Registered successfully!";
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Registration failed!";
      throw new Error(message);
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await client.post("/login", { username, password });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store token
        localStorage.setItem("token", token);

        // Update user data
        setUserData(user);

        // Redirect to home
        navigate("/home");
      }
    } catch (err) {
      const message = err?.response?.data?.message || "Login failed!";
      throw new Error(message);
    }
  };

  const getHistoryOfUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await client.get("/get_all_activity", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const addToUserHistory = async (meetingCode) => {
    try {
      const token = localStorage.getItem("token");
      const response = await client.post(
        "/add_to_activity",
        { meeting_code: meetingCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData,
        handleRegister,
        handleLogin,
        getHistoryOfUser,
        addToUserHistory,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
