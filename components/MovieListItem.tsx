import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import Svg, { Circle, Rect, Text as SVGText } from "react-native-svg";
import { PopularMovieResult } from "../types/PopularMovie.type";
import Rating from "./Rating";

interface MovieListItemProps {
  image: string;
  data: PopularMovieResult;
  onPress: () => void;
}

export default function MovieListItem({
  image,
  data,
  onPress,
}: MovieListItemProps) {
  return (
    <Pressable style={styles.itemContainer} onPress={onPress}>
      <Image source={{ uri: image }} style={{ aspectRatio: 2 / 3 }} />
      <View style={{ padding: 8 }}>
        <Text style={styles.titleText}>{data.title}</Text>
        <Text>{data.vote_average}</Text>
      </View>
      <View style={styles.ratingContainer}>
        <Rating rating={data.vote_average} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: colors.white,

    flex: 1,

    //   width: width / 2 - 16,
    marginHorizontal: 8,
    elevation: 5,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    position: "relative",
  },
  ratingContainer: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
