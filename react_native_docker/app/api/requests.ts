import axiosInstance from "./axios";
import {
  CreateLocationRequest,
  CreateLocationRequestSuccessful,
} from "./types";

const addNewMarkerRequest = async (data: CreateLocationRequest) => {
  try {
    const { data } =
      await axiosInstance.post<CreateLocationRequestSuccessful>(
        "/api/locations"
      );
    return data;
  } catch (error) {
    console.error("Error in addNewLocation: ", error);
  }
};

export { addNewMarkerRequest };
