import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PopularMovies from "../screens/movies/PopularMovies";
import MovieDetail from "../screens/movies/MovieDetail";
import { useAuthentication } from "../hooks/useAuthentication";
import Login from "../screens/Login";
import Register from "../screens/Register";

export type MovieStackParamList = {
  Login: undefined;
  Register: undefined;
  PopularMovies: undefined;
  MovieDetail: { movieId: number; movieTitle?: string };
};

const Stack = createNativeStackNavigator<MovieStackParamList>();

export default function Navigation() {
  const { user } = useAuthentication();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user && (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
        <Stack.Group navigationKey={user ? "user" : "guest"}>
          <Stack.Screen name="PopularMovies" component={PopularMovies} />
          <Stack.Screen name="MovieDetail" component={MovieDetail} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
