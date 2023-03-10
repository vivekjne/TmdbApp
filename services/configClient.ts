import Constants from "expo-constants";
import Api from "./api";

export const getConfig = () => {
  return Api.get(
    `/configuration?api_key=${Constants.expoConfig?.extra.apiKey}`
  );
};
