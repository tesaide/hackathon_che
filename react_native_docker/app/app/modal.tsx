import { Text } from "react-native";
import React, { useContext } from "react";
import AppBar from "../components/AppBar";
import { Checkbox } from "react-native-paper";
import {
  accessibilityLevels,
  FiltersContext,
} from "../contexts/FiltersContext";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import { useTranslation } from "react-i18next";

const Modal = () => {
  const { t } = useTranslation("filters");
  const { filters, setFilters } = useContext(FiltersContext);

  return (
    <CustomSafeAreaView>
      <AppBar title={t("filters")} />
      <Text style={{ textAlign: "center", fontSize: 20 }}>
        {t("chooseAccessibilityLevel")}
      </Text>
      {accessibilityLevels.map((item) => (
        <Checkbox.Item
          key={item}
          label={t(item)}
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
