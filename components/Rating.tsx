import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { colors } from "../theme/colors";
import Svg, { Circle, Rect, Text as SVGText } from "react-native-svg";
interface RatingProps {
  rating: number;
}

export default function Rating({ rating }: RatingProps) {
  const ratingPercent = Math.round(rating * 10);

  const strokeColor =
    ratingPercent > 70 ? "green" : ratingPercent > 30 ? "yellow" : "red";

  return (
    <Svg height="50" width="50" viewBox="0 0 100 100">
      <Circle
        cx="50"
        cy="50"
        r="45"
        stroke={strokeColor}
        strokeWidth="10"
        fill={colors.violet}
      />
      <SVGText x="50%" y="62.5" fontSize="40" fill="white" textAnchor="middle">
        {ratingPercent}
      </SVGText>
    </Svg>
  );
}

const styles = StyleSheet.create({});
