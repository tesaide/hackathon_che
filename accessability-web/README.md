# Chernihiv without Barriers (Чернігів без бар'єрів) - Web Portal Documentation

## Overview

The web portal for "Chernihiv without Barriers" (Чернігів без бар'єрів) serves as an administrative interface for managing the data displayed on the mobile application. It allows authorized users to create, read, update, and delete information about accessible locations, users, roles, organizations, and accessibility features within Chernihiv. This portal ensures data accuracy and facilitates the growth of the accessible locations database.

## Functionality

The web portal provides the following key functionalities:

- **User Management:**
  - View a table of registered users.
  - Create new user accounts.
  - Edit existing user information.
- **Role Management:**
  - View a table of defined user roles (e.g., administrator, moderator).
  - Create new roles with specific permissions.
  - Update existing role permissions.
- **Organization Management:**
  - View a table of organizations (e.g., businesses, institutions).
  - Create new organization profiles.
  - Edit existing organization details.
- **Location Management:**
  - View a table of all accessible locations with key details.
  - Create new accessible location entries, including:
    - Name and address.
    - Geographical coordinates (latitude and longitude, selectable via a Google Map).
    - Type and category of location.
    - Detailed description.
    - Contact information (phone numbers, email addresses).
    - Working hours.
    - Potentially status and accessibility rating.
  - Edit existing location information.
  - Delete location entries.
- **Accessibility Features Management:**
  - View a table of available accessibility features (e.g., ramps, elevators, accessible restrooms).
  - Create new accessibility features.
  - Edit existing accessibility feature details.
- **Authentication:** Secure login for authorized personnel to access the administrative features.
- **Landing Page:** A public-facing landing page providing an overview of the project.

## Technical Details

The web portal is built using **React**, a JavaScript library for building user interfaces.

### Key Technologies and Libraries:

- **React:** For building the dynamic user interface.
- **`react-dom`:** Provides DOM-specific methods for React.
- **`leaflet`:** A popular open-source JavaScript library for interactive maps (though its usage isn't explicitly shown in the provided snippets, it's imported in `index.js` and might be used in other parts of the application).
- **`react-router-dom`:** For handling navigation within the web application, enabling different URLs for different sections.
- **Ant Design (`antd`):** A UI library providing a set of high-quality React components (e.g., `Table`, `Button`, `Form`, `Input`, `Select`).
- **`@react-google-maps/api`:** A React wrapper for the Google Maps JavaScript API, used for the interactive map in the location form.

### File Breakdown (Based on Provided Snippets):

**1. `index.js` (Entry Point):**

- Sets up the React application using `createRoot`.
- Imports global CSS (`./index.css`) and Leaflet's CSS (`'leaflet/dist/leaflet.css'`).
- Uses `BrowserRouter` to enable client-side routing.
- Defines the application's routes using `Routes` and `Route` components:
  - `/`: Renders the `Landing` component (public landing page).
  - `/login`: Renders the `Login` component (authentication).
  - `/users`: Renders `UsersTable` for managing users.
  - `/users/create`: Renders `UsersForm` for creating new users.
  - `/users/:id`: Renders `UsersForm` for editing existing users (dynamic route parameter `id`).
  - `/roles`: Renders `RolesTable` for managing roles.
  - `/roles/create`: Renders `RolesFormWrapper` for creating new roles.
  - `/roles/update/:id`: Renders `RolesFormWrapper` for updating roles.
  - `/organizations`: Renders `OrganizationsTable` for managing organizations.
  - `/organizations/create`: Renders `OrganizationsForm` for creating organizations.
  - `/organizations/:id`: Renders `OrganizationsForm` for editing organizations.
  - `/locations`: Renders `LocationTable` for managing locations.
  - `/locations/create`: Renders `LocationFormWrapper` for creating new locations.
  - `/locations/update/:id`: Renders `LocationFormWrapper` for updating locations.
  - `/accessibility-features`: Renders `AccessibilityFeaturesTable` for managing accessibility features.
  - `/accessibility-features/create`: Renders `AccessibilityFeaturesForm` for creating new accessibility features.
  - `/accessibility-features/:id`: Renders `AccessibilityFeaturesForm` for editing accessibility features.

**2. `locations/actions/locations.js` (Location Data Actions):**

- Defines asynchronous functions to interact with location data (likely with a backend API, although the API calls are commented out as `// api вызов...`).
- **`getLocationsWithDispatch(dispatch)`:** Fetches location data and dispatches an action (`SET_LOCATIONS`) to update the application state using a reducer. Currently uses placeholder data `initial`.
- **`delLocationWithDispatch(delLocationId, dispatch)`:** Sends a request to delete a location by its ID and dispatches a `DELETE_LOCATION` action.
- **`addLocation(newLocation)`:** Sends a request to add a new location.
- **`updateLocation(updateLocation)`:** Sends a request to update an existing location.

**3. `locations/components/LocationForm.js` (Location Form Component):**

- A functional component for creating and editing location data.
- Uses `useParams` to get the `id` from the URL for editing.
- Uses `Form.useForm()` from Ant Design to manage the form state and validation.
- Uses `useState` to manage the selected location data (`selectedLocation`) and the coordinates for the map (`coordinates`).
- Uses `useNavigate` for programmatic navigation.
- **`useEffect`:** Populates the form with existing location data when in edit mode (`isEditing`).
- **`handleMapClick`:** A useCallback function triggered when the user clicks on the Google Map, updating the coordinates in the form.
- **`handleSubmit`:** Called when the form is submitted. It constructs the location data object and calls either `addLocation` or `updateLocation` based on whether it's a new entry or an edit.
- Renders a form using Ant Design components (`Form`, `Row`, `Col`, `Input`, `InputNumber`, `Button`, `Divider`, `Select`, `TextArea`).
- Includes a `LocationGoogleMapForm` component to display and interact with a map for selecting coordinates.
- Provides a dropdown (`Select`) for choosing the `type` of location.

**4. `locations/components/LocationFormWrapper.js` (Location Form Wrapper):**

- A simple wrapper component that uses `useLocation` from `react-router-dom` to access state passed during navigation (specifically `locations` and `isEditing`).
- Passes these props to the `LocationForm` component. This is a common pattern to provide data to a form component that might be used for both creation and editing.

**5. `locations/components/LocationGoogleMapForm.js` (Google Map Form Component):**

- Uses the `@react-google-maps/api` library to display an interactive Google Map.
- Takes `lat`, `lon`, and `onClick` props to control the map's center, marker position, and click handler.
- Uses `useJsApiLoader` to asynchronously load the Google Maps API.
- Displays loading and error states for the map.
- Renders a `GoogleMap` component with a `Marker`.

**6. `locations/components/LocationTable.js` (Location Table Component):**

- Uses `useReducer` to manage the state of the locations data (`locations`) and a `dispatch` function to update it.
- Uses `useState` to manage the ID of the location to be deleted (`locationId`) for the confirmation modal.
- Uses `useNavigate` for programmatic navigation.
- **`useEffect`:** Calls `getLocationsWithDispatch` on component mount to fetch and display location data.
- **`handleDeleteLocation`:** Asynchronously calls `delLocationWithDispatch` to delete a location and handles potential errors.
- Defines the columns for the Ant Design `Table` component, including: ID, Name, Address, Type, Category, Coordinates, Accessibility Rating, Status, and Actions.
- The "Actions" column renders a `TableActions` component (likely a custom component for edit and delete buttons) and sets the `locationId` for deletion confirmation.
- Renders the Ant Design `Table` to display the list of locations.
- Uses a `ConfirmDeleteModal` (likely a custom component) to confirm the deletion of a location.
- Includes a `CreateEntityBtn` (likely a custom component) to navigate to the location creation form.

## Team

- 1donato1
- Olexandr ([Alexbo3605](https://github.com/Alexbo3605))
- LoftiGlobal
- Sh1irr
- Serge Zenchenko ([sszenchenko](https://github.com/sszenchenko))
- teren-ukr
- Ivan Petrov ([vanya201](https://github.com/vanya201))
- Magnus07

## Acknowledgements

We would like to thank the organizers of the hackathon and the community of Chernihiv for their support in making this project possible.

## Conclusion

The web portal for "Chernihiv without Barriers" provides a crucial administrative interface for managing the data that powers the mobile application. By offering comprehensive CRUD (Create, Read, Update, Delete) functionalities for key entities, the portal ensures the accuracy and growth of the accessible locations database, ultimately contributing to a more inclusive Chernihiv.
