import * as z from "zod";

const LocationTypeSchema = z.enum(["government", "business", "ngo"]);

const LocationSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  address: z.string().min(1),
  coordinates: z.string(), //  You might want to add a custom validation for the POINT(longitude latitude) format if needed
  type: LocationTypeSchema,
  category: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  phone: z.string().nullable().optional(), //  z.record(z.string(), z.any()) for JSONB

  website: z.string().nullable().optional(), //  z.record(z.string(), z.any()) for JSONB

  email: z.string().nullable().optional(), //  z.record(z.string(), z.any()) for JSONB
  working_hours: z.record(z.string(), z.any()).nullable().optional(), // z.record(z.string(), z.any()) for JSONB
  created_by: z.string().uuid(),
  organization_id: z.string().uuid().nullable().optional(),
  status: z.enum(["draft", "pending", "published", "rejected"]),
  overall_accessibility_score: z.number().int().nullable().optional(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  last_verified_at: z.string().datetime().nullable().optional(),
  rejection_reason: z.string().nullable().optional(),
});

export { LocationSchema, LocationTypeSchema };
