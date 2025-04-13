import { View, StyleSheet, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { Button, Snackbar, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import AuthWrapper from "./components/AuthWrapper";
import { UserContext } from "../_layout";
import CustomDialog from "../../components/icons/Dialog";

const mockUser = {
  email: "Test",
  password: "Test",
};

const LoginView = () => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const { setUser } = useContext(UserContext);
  const [loginData, setLoginData] = useState<typeof mockUser>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleCreateAccount = () => {
    router.push("/auth/register");
  };

  const handleLogin = () => {
    if (
      loginData.email === mockUser.email &&
      loginData.password === mockUser.password &&
      setUser
    ) {
      setUser(mockUser);
      router.replace("/");
    } else {
      setIsDialogVisible(true);
    }
  };
  return (
    <AuthWrapper>
      <View style={{ justifyContent: "space-between", flex: 3 }}>
        <Text style={{ fontSize: 24, textAlign: "center" }}>Login</Text>
        <View>
          <TextInput
            style={{
              borderRadius: 15,
              borderColor: "#000",
              borderWidth: 1,
              fontSize: 12,
              paddingVertical: 20,
              paddingHorizontal: 16,
            }}
            value={loginData.email}
            onChangeText={(email) => setLoginData({ ...loginData, email })}
            placeholder="Email address"
          ></TextInput>
        </View>

        <View>
          <TextInput
            style={{
              borderRadius: 15,
              borderColor: "#000",
              borderWidth: 1,
              fontSize: 12,
              paddingVertical: 20,
              paddingHorizontal: 16,
            }}
            placeholder="Password"
            value={loginData.password}
            onChangeText={(password) =>
              setLoginData({ ...loginData, password })
            }
          ></TextInput>
        </View>
        <Text>Forgot password?</Text>
        <Button
          style={{
            backgroundColor: "#44B149",
            padding: 16.5,
            borderRadius: 30,
          }}
          onPress={handleLogin}
        >
          <Text style={{ fontSize: 18 }}>Log In</Text>
        </Button>
      </View>
      <View style={{ flex: 2, justifyContent: "space-evenly" }}>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: StyleSheet.hairlineWidth,
            position: "relative",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -10,
              left: "48%",
            }}
          >
            <Text
              style={{
                fontSize: 14,
              }}
            >
              or
            </Text>
          </View>
        </View>
        <Button
          style={{
            backgroundColor: "transparent",
            borderColor: "#44B149",
            borderWidth: 3,
            padding: 16.5,
            borderRadius: 30,
          }}
          onPress={handleCreateAccount}
        >
          <Text style={{ fontSize: 18 }}>Create account</Text>
        </Button>
      </View>
      <Snackbar
        visible={isDialogVisible}
        onDismiss={() => setIsDialogVisible(false)}
      >
        Wrong email or password
      </Snackbar>
    </AuthWrapper>
  );
};

export default LoginView;
