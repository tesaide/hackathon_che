import { Stack } from "expo-router";
import {
  accessibilityLevels,
  FiltersContext,
} from "../contexts/FiltersContext";
import { createContext, useContext, useState } from "react";

interface IUser {
  email: string;
  password: string;
}

interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>> | null;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: null,
});

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
