export type CreateLocationRequest = {
  name: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  type: string; // Assuming 'enum' means a string with a specific set of allowed values
  category?: string;
  description?: string;
  contacts?: {
    phone?: string;
    email?: string;
    website?: string;
  };
  workingHours?: object; // You might want to define a more specific type for working hours
  organizationId?: string; // Assuming UUID is represented as a string
  status?: "draft" | string; // Include 'draft' as the default and allow other string values if needed
};

export type CreateLocationRequestSuccessful = {
  id: string; // Assuming UUID is represented as a string
  name: string;
  type: "government" | "business" | "ngo";
  edrpou: string;
  website?: string;
  isVerified: boolean;
  verificationDocumentUrl?: string;
  createdAt: string; // ISO 8601 date-time string
};
