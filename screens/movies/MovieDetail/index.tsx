import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  Image,
  useWindowDimensions,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MovieStackParamList } from "../../../navigation";
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailQuery,
} from "../../../store/tmdb";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/config";
import { colors } from "../../../theme/colors";
import MovieCredit from "./MovieCredit";
import Rating from "../../../components/Rating";
import { auth, signOut } from "../../../utils/firebase";

type MovieDetailProps = NativeStackScreenProps<
  MovieStackParamList,
  "MovieDetail"
>;
export default function MovieDetail({ route, navigation }: MovieDetailProps) {
  const { movieId, movieTitle } = route.params;
  const { data, error, isLoading } = useGetMovieDetailQuery(movieId);

  const { width, height } = useWindowDimensions();
  const globalConfig = useSelector((state: RootState) => state.global.config);

  useEffect(() => {
    navigation.setOptions({ title: movieTitle });
  }, [navigation]);
  console.log("error", error);
  const backdropUrl = `${globalConfig?.images.base_url}/w300/${data?.backdrop_path}`;
  const posterUrl = `${globalConfig?.images.base_url}/w300/${data?.poster_path}`;

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <ScrollView>
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
          <ImageBackground
            source={{ uri: backdropUrl }}
            style={{
              width,
              height: height / 3,
              position: "relative",
              zIndex: 999,
            }}
            blurRadius={2}
          >
            <Image
              source={{ uri: posterUrl }}
              style={{ resizeMode: "contain", width, height: height / 3 }}
            />
            <View
              style={{
                position: "absolute",
                bottom: -15,
                right: 10,
              }}
            >
              <Rating rating={data.vote_average} />
            </View>
          </ImageBackground>
          <View
            style={{
              padding: 16,

              backgroundColor: colors.white,
              // minHeight: height * (2 / 3) - 56,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: colors.violet,
              }}
            >
              {data.title} ({new Date(data.release_date).getFullYear()})
            </Text>

            <Text style={{ fontStyle: "italic" }}>{data.tagline}</Text>

            <View style={{ marginVertical: 16 }}>
              <Text
                style={{
                  fontSize: 20,
                  textDecorationColor: colors.orange,
                  textDecorationStyle: "solid",
                  textDecorationLine: "underline",
                  marginBottom: 8,
                  fontWeight: "bold",
                }}
              >
                Overview
              </Text>
              <Text>{data.overview}</Text>
            </View>

            {/* Movie credits */}
            <MovieCredit movieId={movieId} />
          </View>
        </View>
      ) : null}

      <View style={{ paddingHorizontal: 16 }}>
        <Button title="Logout" onPress={handleLogout}></Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
