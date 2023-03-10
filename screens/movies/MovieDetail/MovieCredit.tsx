import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useGetMovieCreditsQuery } from "../../../store/tmdb";
import {
  formatCredit,
  FormatCreditType,
} from "../../../utils/helpers/formatCredit";
import { Cast } from "../../../types/Credits.type";
import { RootState } from "../../../store/config";
import { useSelector } from "react-redux";
import { colors } from "../../../theme/colors";
import CastAndCrewModal from "./CastAndCrewModal";

interface MovieCreditProps {
  movieId: number;
}
export default function MovieCredit({ movieId }: MovieCreditProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { data, error, isLoading } = useGetMovieCreditsQuery(movieId);
  const globalConfig = useSelector((state: RootState) => state.global.config);

  console.log("error", error);
  let formattedCredit;
  if (data) {
    formattedCredit = formatCredit(data);
  }

  const topBilledCast =
    (formattedCredit &&
      formattedCredit.castByDepartment
        .get("Acting")
        .filter((cast: Cast) => cast.order < 9)) ||
    [];

  return (
    <View>
      {error ? (
        <View>
          <Text>Oh no, there was an error</Text>
        </View>
      ) : isLoading ? (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      ) : data ? (
        <View>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Top Billed Cast
          </Text>
          <ScrollView
            horizontal
            contentContainerStyle={{
              gap: 10,
              marginTop: 8,
              marginBottom: 16,
            }}
          >
            {topBilledCast.map((cast: Cast) => {
              const profileUrl = `${globalConfig.images.base_url}/w45/${cast.profile_path}`;
              return (
                <Pressable
                  key={cast.id}
                  style={({ pressed }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    rowGap: 5,
                    elevation: 10,
                    backgroundColor: colors.violet,
                    padding: 10,
                    borderRadius: 8,
                    opacity: pressed ? 0.8 : 1,
                  })}
                >
                  <Image
                    source={{ uri: profileUrl }}
                    style={{ width: 50, height: 50, borderRadius: 25 }}
                  />
                  <View style={{ marginLeft: 8 }}>
                    <Text style={{ fontWeight: "bold", color: colors.white }}>
                      {cast.name}
                    </Text>
                    <Text style={{ color: colors.lightBlue }}>
                      {cast.character}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>

          <View>
            <Pressable
              style={({ pressed }) => ({
                backgroundColor: colors.black,
                padding: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                opacity: pressed ? 0.5 : 1,
              })}
              onPress={() => setIsVisible(true)}
            >
              <Text style={{ fontSize: 18, color: colors.white }}>
                Show Full Cast & Crew
              </Text>
              <Text style={{ fontSize: 18, color: colors.white }}>{"->"}</Text>
            </Pressable>
            {formattedCredit && (
              <CastAndCrewModal
                isVisible={isVisible}
                onClose={() => setIsVisible(false)}
                data={formattedCredit as FormatCreditType}
              />
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({});
