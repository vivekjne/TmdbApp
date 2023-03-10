import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useGetPopularMoviesQuery } from "../../store/tmdb";
import { PopularMovieResult } from "../../types/PopularMovie.type";
import { colors } from "../../theme/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../store/config";
import { Configuration } from "../../types/Configuration.type";
import Svg, { Circle, Rect, Text as SVGText } from "react-native-svg";
import MovieListItem from "../../components/MovieListItem";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MovieStackParamList } from "../../navigation";

type PopularMoviesProps = NativeStackScreenProps<
  MovieStackParamList,
  "PopularMovies"
>;

export default function PopularMovies({ navigation }: PopularMoviesProps) {
  const [movies, setMovies] = useState<PopularMovieResult>([]);
  const [noMoreResults, setNoMoreResults] = useState(false);
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetPopularMoviesQuery(page, {
    skip: noMoreResults,
  });
  const { width, height } = useWindowDimensions();
  const globalConfig = useSelector((state: RootState) => state.global.config);

  useEffect(() => {
    if (data?.results?.length) {
      setMovies([...movies, ...data.results]);
    } else if (page > 1) {
      setNoMoreResults(true);
    }
  }, [data]);

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
          <FlatList
            numColumns={2}
            data={movies}
            contentContainerStyle={{
              gap: 16,
              justifyContent: "space-between",
              paddingTop: 20,
            }}
            renderItem={({ item }: { item: PopularMovieResult }) => {
              const image = `${globalConfig.images.base_url}/w185/${item.poster_path}`;

              return (
                <MovieListItem
                  onPress={() =>
                    navigation.navigate("MovieDetail", {
                      movieId: item.id,
                      movieTitle: item.title,
                    })
                  }
                  data={item}
                  image={image}
                />
              );
            }}
            onEndReached={(info) => {
              if (!noMoreResults) {
                setPage((page) => page + 1);
              }
            }}
            onEndReachedThreshold={0.2}
            ListFooterComponent={() => (
              <View style={{ height: 50 }}>
                <ActivityIndicator size="small" />
              </View>
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
});
