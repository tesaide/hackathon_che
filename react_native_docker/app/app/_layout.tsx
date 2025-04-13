import { Stack } from "expo-router";
import {
  accessibilityLevels,
  FiltersContext,
} from "../contexts/FiltersContext";
import { useEffect, useState } from "react";
import { IUser, UserContext } from "../contexts/UserContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import * as RNLocalize from "react-native-localize";

export default function Layout() {
  const [user, setUser] = useState<IUser | null>(null);
  const [filters, setFilters] = useState(accessibilityLevels);

  useEffect(() => {
    // Set the initial language based on device locale
    const locale = RNLocalize.getLocales()[0].languageCode;
    i18n.changeLanguage(locale);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <FiltersContext.Provider value={{ filters, setFilters }}>
        <I18nextProvider i18n={i18n}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
              }}
            />
          </Stack>
        </I18nextProvider>
      </FiltersContext.Provider>
    </UserContext.Provider>
  );
}
