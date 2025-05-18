import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface Basic {
  name: string;
  type: string;
  price: string;
  title: string;
  description: string;
}

export interface Location {
  street: string;
  zip: string;
  city: string;
  province: string;
  region: string;
  landmark: string;
}

export interface Features {
  parking: string;
  kitchen: string;
  balcony: string;
  category: string;
  waterFacility: string;
  direction: string;
  floor: string;
}

export interface Contact {
  username: string;
  phone: string;
  email: string;
}

export interface ImagesProps {
  url: Array<string>[];
}

export interface locationPinned {
  locationName: string;
  latitude: number;
  longitude: number;
}

export interface FormState {
  Basic: Basic;
  Location: Location;
  Features: Features;
  Contact: Contact;
  ImagesProps: ImagesProps;
  pinnedLocation: locationPinned;
}

const initialState: FormState = {
  Basic: {
    name: "",
    type: "",
    price: "",
    title: "",
    description: "",
  },
  Location: {
    street: "",
    zip: "",
    city: "",
    province: "",
    region: "",
    landmark: "",
  },
  Features: {
    parking: "",
    kitchen: "",
    balcony: "",
    category: "",
    waterFacility: "",
    direction: "",
    floor: "",
  },
  Contact: {
    username: "",
    phone: "",
    email: "",
  },
  ImagesProps: {
    url: [],
  },
  pinnedLocation: {
    locationName: "",
    latitude: 0,
    longitude: 0,
  },
};

const formSlice = createSlice({
  name: "formSlice",
  initialState,
  reducers: {
    basicDetails: (state, action) => {
      state.Basic = action.payload;
      localStorage.setItem("Post_Basic", JSON.stringify(state.Basic));
    },
    locationDetails: (state, action) => {
      state.Location = action.payload;
      localStorage.setItem("Post_Location", JSON.stringify(state.Location));
    },

    featureDetails: (state, action) => {
      state.Features = action.payload;
      localStorage.setItem("Post_Features", JSON.stringify(state.Features));
    },

    contactDetails: (state, action) => {
      state.Contact = action.payload;
      localStorage.setItem("Post_Contact", JSON.stringify(state.Contact));
    },

    imageDetails: (state, action) => {
      state.ImagesProps = action.payload;
      localStorage.setItem("Post_Images", JSON.stringify(state.ImagesProps));
    },
    pinnedLocationDetail: (state, action) => {
      state.pinnedLocation = action.payload;
      localStorage.setItem(
        "Post_Pinned_Location",
        JSON.stringify(state.pinnedLocation)
      );
    },
  },
});

export const {
  basicDetails,
  locationDetails,
  featureDetails,
  contactDetails,
  imageDetails,
  pinnedLocationDetail,
} = formSlice.actions;

export default formSlice.reducer;
