import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { validationRules } from "../../utils/helpers/validationRules";
import { auth, signInWithEmailAndPassword } from "../../utils/firebase";
import { colors } from "../../theme/colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MovieStackParamList } from "../../navigation";

type LoginProps = NativeStackScreenProps<MovieStackParamList, "Login">;

export default function Login({ navigation }: LoginProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (err) {
      console.log(err);
      Alert.alert("Registration Error!");
    }
  };

  return (
    <View style={{ paddingHorizontal: 16, marginTop: "20%" }}>
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
              placeholder="Enter email"
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

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

      <Text
        style={styles.signupText}
        onPress={() => navigation.navigate("Register")}
      >
        Sign up user
      </Text>
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
  signupText: {
    textDecorationStyle: "dashed",
    textDecorationColor: "blue",
    textDecorationLine: "underline",
    textAlign: "center",
    marginTop: 20,
    color: colors.blue,
  },
});
