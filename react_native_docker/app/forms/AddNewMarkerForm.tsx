import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "react-native-paper"; // Import Button from React Native Paper
import { TextInput, Text } from "react-native-paper"; // Import TextInput from React Native Paper
import { ScrollView, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { LocationSchema, LocationTypeSchema } from "../zod/LocationSchema";
import { addNewMarkerRequest, CreateLocationRequest } from "../api";
import { useLocalSearchParams } from "expo-router";

type Location = z.infer<typeof LocationSchema>;

const AddNewMarkerForm = () => {
  const { latitude, longitude } = useLocalSearchParams();

  const form = useForm<Location>({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      //   id: 1,
      name: "",
      address: "",
      coordinates: `${latitude};${longitude}`,
      type: "government",
      category: null,
      description: null,
      working_hours: null,
      //   created_by: 1,
      organization_id: null,
      status: "draft",
      overall_accessibility_score: null,
      //   created_at: new Date(),
      //   updated_at: new Date(),
      last_verified_at: null,
      rejection_reason: null,
    },
  });

  const onSubmit = (data: Location) => {
    const dataToSend: CreateLocationRequest = {
      ...data,
      //   contacts:{}
      category: data.category ?? undefined,
      description: data.description ?? undefined,
      coordinates: { lat: Number(latitude), lng: Number(longitude) },
      //   created_at: data.created_at.toISOString(),
      //   updated_at: data.updated_at.toISOString(),
      //   last_verified_at: data.last_verified_at?.toISOString() ?? null,
    };
    addNewMarkerRequest(dataToSend);
  };

  const locationTypeOptions = Object.keys(LocationTypeSchema.Values).map(
    (key) => ({
      label: key.replace(/([A-Z])/g, " $1").trim(),
      value:
        LocationTypeSchema.Values[
          key as keyof typeof LocationTypeSchema.Values
        ],
    })
  );

  const fields = [
    {
      name: "name",
      label: "Name",
      placeholder: "Location Name",
      component: TextInput,
    },
    {
      name: "address",
      label: "Address",
      placeholder: "Location Address",
      component: TextInput,
    },
    {
      name: "phone",
      label: "Phone",
      placeholder: "Location phone",
      component: TextInput,
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Location email",
      component: TextInput,
    },
    {
      name: "website",
      label: "Website",
      placeholder: "Location Website",
      component: TextInput,
    },
    {
      name: "coordinates",
      label: "Coordinates",
      placeholder: "POINT(longitude latitude)",
      component: TextInput,
      description:
        'Enter coordinates in the format "POINT(longitude latitude)".',
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Location Description",
      component: TextInput,
    },
  ];

  const renderFormField = (fieldConfig: (typeof fields)[0]) => {
    const { name, label, placeholder, description, type } = fieldConfig;

    return (
      <Controller
        control={form.control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <View>
            <Text>{label}</Text>
            {/* <FormControl>
              {Component === Select ? (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options?.map(
                      (option: { label: string; value: string }) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              ) : ( */}
            <TextInput
              mode="outlined" // Use outlined style for React Native Paper
              label={label} // Pass the label
              placeholder={placeholder}
              onChangeText={field.onChange}
              {...field}
              {...(type ? { keyboardType: "numeric" } : {})} // set the keyboard
            />
            {/* )} */}
            {/* </FormControl> */}
            {description && <Text>{description}</Text>}
            {/* <FormMessage /> */}
            {error && <Text>{error.message}</Text>}
          </View>
        )}
      />
    );
  };

  return (
    <View {...form} style={{ margin: 10 }}>
      <ScrollView>
        {fields.map((field) => renderFormField(field))}
        <View style={{ marginTop: 10 }}></View>
        <Button mode="contained" onPress={form.handleSubmit(onSubmit)}>
          Create Location
        </Button>
      </ScrollView>
    </View>
  );
};

export default AddNewMarkerForm;
