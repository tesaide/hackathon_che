import React from "react";
import AddNewMarkerForm from "../../forms/AddNewMarkerForm";
import AppBar from "../../components/AppBar";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";
import { useTranslation } from "react-i18next";

const AddNewMarkerScreen = () => {
  const { t } = useTranslation("addNewMarker");
  return (
    <CustomSafeAreaView>
      <AppBar title={t("addNewMarker")} />
      <AddNewMarkerForm />
    </CustomSafeAreaView>
  );
};

export default AddNewMarkerScreen;
