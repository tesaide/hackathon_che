import { SafeAreaView } from "react-native";
import React, { useState } from "react";
import AddNewMarkerForm from "../../forms/AddNewMarkerForm";
import AppBar from "../../components/AppBar";

enum LocationType {
  GovernmentBuilding = "government_building",
  Business = "business",
  Healthcare = "healthcare",
  Education = "education",
  Culture = "culture",
  Transport = "transport",
  Recreation = "recreation",
  Other = "other",
}

interface ILocation {
  id: string; // UUID (PK)
  name: string;
  address: string;
  coordinates: string; // Representing GEOMETRY(POINT, 4326) as a string (e.g., "POINT(longitude latitude)")
  type: LocationType;
  category?: string; // підкатегорія об'єкту
  description?: string;
  contacts?: Record<string, any>; // JSONB - телефони, emails, веб-сайти (using Record<string, any> for flexibility)
  working_hours?: Record<string, any>; // JSONB - години роботи (using Record<string, any> for flexibility)
  created_by: string; // UUID (FK -> users.id)
  organization_id?: string | null; // UUID (FK -> organizations.id, nullable)
  status: "draft" | "pending" | "published" | "rejected";
  overall_accessibility_score?: number; // загальний рейтинг доступності, розрахований системою
  created_at: string; // TIMESTAMP NOT NULL DEFAULT NOW()
  updated_at: string; // TIMESTAMP NOT NULL DEFAULT NOW()
  last_verified_at?: string | null; // TIMESTAMP
  rejection_reason?: string | null;
  // Індекс: GiST(coordinates) - for fast coordinate-based search (this is a database index and doesn't translate directly to a TS interface)
}

const INITIAL_LOCATION: ILocation = {
  id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
  name: "Chernihiv City Council",
  address: "Red Square, 1, Chernihiv, 14000",
  coordinates: "POINT(31.3033 51.4958)",
  type: LocationType.GovernmentBuilding,
  category: "Local Government",
  description: "The main administrative building of the city of Chernihiv.",
  contacts: {
    phone: ["+380 (462) 77-44-44"],
    email: ["info@chernihivrada.gov.ua"],
    website: "https://chernihivrada.gov.ua/",
  },
  working_hours: {
    monday: "09:00-18:00",
    tuesday: "09:00-18:00",
    wednesday: "09:00-18:00",
    thursday: "09:00-18:00",
    friday: "09:00-17:00",
    saturday: "Closed",
    sunday: "Closed",
  },
  created_by: "user-uuid-123",
  organization_id: "org-uuid-456",
  status: "published",
  overall_accessibility_score: 85,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  last_verified_at: new Date().toISOString(),
  rejection_reason: null,
};

const AddNewMarkerScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AppBar title="Add new marker" />
      <AddNewMarkerForm />
    </SafeAreaView>
  );
};

export default AddNewMarkerScreen;
