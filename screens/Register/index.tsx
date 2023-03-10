import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { validationRules } from "../../utils/helpers/validationRules";
import {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "../../utils/firebase";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MovieStackParamList } from "../../navigation";

type RegisterProps = NativeStackScreenProps<MovieStackParamList, "Register">;

export default function Register({ navigation }: RegisterProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  console.log("errors", errors);

  const onSubmit = async (data) => {
    try {
      const userCreated = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(userCreated.user, {
        displayName: data.username,
        photoURL:
          "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg",
      });
      navigation.navigate("PopularMovies");
    } catch (err) {
      Alert.alert("Registration Error!");
    }
  };

  return (
    <View style={{ paddingHorizontal: 16, marginTop: "20%" }}>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={validationRules.username}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="default"
              placeholder="Enter username"
            />
          )}
          name="username"
        />
        {errors.username && <Text>{errors.username.message}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={validationRules.email}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              placeholder="Enter email address"
            />
          )}
          name="email"
        />
        {errors.email && <Text>{errors.email.message}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          rules={validationRules.password}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
              placeholder="Enter password"
            />
          )}
          name="password"
        />
        {errors.password && <Text>{errors.password.message}</Text>}
      </View>

      <Button title="Register" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    // marginBottom: 16,
    borderWidth: 1,
    padding: 8,
  },
});
