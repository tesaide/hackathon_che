import React from "react";
import AddNewMarkerForm from "../../forms/AddNewMarkerForm";
import AppBar from "../../components/AppBar";
import CustomSafeAreaView from "../../components/CustomSafeAreaView";

const AddNewMarkerScreen = () => {
  return (
    <CustomSafeAreaView>
      <AppBar title="Add new marker" />
      <AddNewMarkerForm />
    </CustomSafeAreaView>
  );
};

export default AddNewMarkerScreen;
