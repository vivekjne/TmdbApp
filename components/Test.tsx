import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/config";
export default function Test() {
  const global = useSelector((state: RootState) => state.global);
  console.log("global", global);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{JSON.stringify(global)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
