import { Text } from "react-native";
import React, { useContext } from "react";
import AppBar from "../components/AppBar";
import { Checkbox } from "react-native-paper";
import {
  accessibilityLevels,
  FiltersContext,
} from "../contexts/FiltersContext";
import CustomSafeAreaView from "../components/CustomSafeAreaView";

const Modal = () => {
  const { filters, setFilters } = useContext(FiltersContext);

  return (
    <CustomSafeAreaView>
      <AppBar title="Filters" />
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        Choose your accessibility level:
      </Text>
      {accessibilityLevels.map((item) => (
        <Checkbox.Item
          key={item}
          label={item}
          status={filters.includes(item) ? "checked" : "unchecked"}
          onPress={() => {
            const isChecked = filters.includes(item);
            if (isChecked) {
              setFilters((prev) => prev.filter((level) => level !== item));
            } else {
              setFilters((prev) => [...prev, item]);
            }
          }}
        />
      ))}
    </CustomSafeAreaView>
  );
};

export default Modal;
