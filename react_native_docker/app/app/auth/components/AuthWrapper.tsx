import { View, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { TouchableRipple } from "react-native-paper";
import CustomSafeAreaView from "../../../components/CustomSafeAreaView";
import SVGBackButton from "../../../components/icons/SVGBackButton";
import SVGLogoLarge from "../../../components/icons/SVGLogoLarge";

import { LinearGradient } from "expo-linear-gradient";

interface IProps {
  children: React.ReactNode;
}

const AuthWrapper = ({ children }: IProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <LinearGradient
      // Background Linear Gradient
      colors={["#AED1E7", "#CFE6DC"]}
      style={styles.background}
    >
      <CustomSafeAreaView>
        <View style={[styles.flex1, { margin: 16 }]}>
          <View
            style={{
              flexDirection: "column",
              alignContent: "space-around",
              flex: 2,
            }}
          >
            <View style={styles.flex1}>
              {router.canGoBack() && (
                <TouchableRipple
                  style={{ width: 50, height: 50, justifyContent: "center" }}
                  rippleColor="transparent"
                  onPress={handleGoBack}
                >
                  <SVGBackButton />
                </TouchableRipple>
              )}
            </View>
            <View style={[styles.flex1, { alignItems: "center" }]}>
              <SVGLogoLarge />
            </View>
          </View>
          {children}
        </View>
      </CustomSafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "orange",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});

export default AuthWrapper;
