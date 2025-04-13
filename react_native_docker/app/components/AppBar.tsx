import React from "react";
import { Appbar } from "react-native-paper";
import { useRouter } from "expo-router";

interface Props {
  title?: string;
}

const AppBar = ({ title }: Props) => {
  const router = useRouter();
  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };
  return (
    <Appbar.Header statusBarHeight={0}>
      {router.canGoBack() && <Appbar.BackAction onPress={handleBack} />}
      <Appbar.Content title={title ?? "title"} />
    </Appbar.Header>
  );
};

export default AppBar;
