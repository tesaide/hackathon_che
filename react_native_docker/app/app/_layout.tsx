import { Stack } from "expo-router";
import {
  accessibilityLevels,
  FiltersContext,
} from "../contexts/FiltersContext";
import { useState } from "react";
import { IUser, UserContext } from "../contexts/UserContext";

export default function Layout() {
  const [user, setUser] = useState<IUser | null>(null);
  const [filters, setFilters] = useState(accessibilityLevels);

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
    </UserContext.Provider>
  );
}
