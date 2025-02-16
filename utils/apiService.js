import axios from "axios";

const BASE_URL = "https://rent-ease-bcakend-v2.vercel.app/api/";

const getMethod = async (path, token = null, params = {}) => {
  try {
    const config = {};
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    if (Object.keys(params).length > 0) {
      config.params = params;
    }

    const result = await axios.get(`${BASE_URL}${path}`, config);
    return result;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return { error: error.response?.data || "Something went wrong" };
  }
};

const postMethod = async (path, data = {}, token = null, params = {}) => {
  try {
    const config = {};
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    if (Object.keys(params).length > 0) {
      config.params = params;
    }
    console.log(`${BASE_URL}${path}`);
    const result = await axios.post(`${BASE_URL}${path}`, data, config);
    return result;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return { error: error.response?.data || "Something went wrong" };
  }
};

module.exports = { getMethod, postMethod };
