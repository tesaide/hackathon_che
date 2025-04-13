import { SafeAreaView, StatusBar, Platform } from "react-native";
import React from "react";

interface IProps {
  children: React.ReactNode;
}

const statusBarHeight = StatusBar.currentHeight;
const safeAreaViewStyle = {
  marginTop: Platform.OS === "android" ? statusBarHeight : 0,
  flex: 1,
};

const CustomSafeAreaView = ({ children }: IProps) => (
  <SafeAreaView style={safeAreaViewStyle}>{children}</SafeAreaView>
);

export default CustomSafeAreaView;
