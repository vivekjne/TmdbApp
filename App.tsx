import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import Api from "./services/api";
import Constants from "expo-constants";
import { store } from "./store/config";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setConfiguration } from "./store/globalSlice";
import Test from "./components/Test";
import { getConfig } from "./services/configClient";
import Navigation from "./navigation";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        let config;
        const configStorage = await AsyncStorage.getItem("config");
        if (configStorage) {
          config = JSON.parse(configStorage);
        } else {
          const response = await getConfig();
          config = response.data;
          await AsyncStorage.setItem("config", JSON.stringify(config));
        }

        store.dispatch(setConfiguration(config));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
