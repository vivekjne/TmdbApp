import axios, { AxiosInstance } from "axios";
import Constants from "expo-constants";

const Api: AxiosInstance = axios.create({
  baseURL: `${Constants.expoConfig?.extra.apiBaseUrl}/${Constants.expoConfig?.extra.apiVersion}`,
});

export default Api;
