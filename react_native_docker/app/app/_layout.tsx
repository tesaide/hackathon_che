import { Stack } from "expo-router";
import {
  accessibilityLevels,
  FiltersContext,
} from "../contexts/FiltersContext";
import { useState } from "react";

export default function Layout() {
  const [filters, setFilters] = useState(accessibilityLevels);

  return (
    <FiltersContext.Provider value={{ filters, setFilters }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen
          name="modal"
          options={{
            presentation: "modal",
          }}
        />
      </Stack>
    </FiltersContext.Provider>
  );
}
