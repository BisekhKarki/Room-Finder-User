import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Registration {
  FirstName: string;
  LastName: string;
  Email: string;
  Phone: string;
  Address: string;
  UserType: string;
  Password: string;
}

interface CategoryValues {
  location: string;
  price: string;
  propertyType: string;
}

export interface SliceState {
  validToken: boolean;
  loading: boolean;
  error: string | null;
  registrationData: Registration;
  registrationCode: string;
  verified: boolean;
  resetPassUserEmail: string;
  user: Array<any>;
  userLandlordId: string;
  searchCategoryValues: CategoryValues;
}

const initialState: SliceState = {
  validToken: false,
  loading: false,
  error: null,
  registrationData: {
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Address: "",
    UserType: "",
    Password: "",
  },
  registrationCode: "",
  verified: false,
  resetPassUserEmail: "",
  user: [],
  userLandlordId: "",
  searchCategoryValues: {
    location: "",
    price: "",
    propertyType: "",
  },
};

export const checkToken = createAsyncThunk<
  { success: boolean },
  { token: string },
  { rejectValue: string }
>("checkToken", async ({ token }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      "http://localhost:4000/api/user/verify/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );
    const val = await response.json();

    if (!response.ok) {
      return rejectWithValue(val.message || "Invalid token");
    }
    return val;
  } catch (error: any) {
    return rejectWithValue(error.message || "An error occurred");
  }
});

// To reset the password
export const resetPass = createAsyncThunk<
  { success: boolean },
  { email: string },
  { rejectValue: string }
>("resetPass", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:4000/api/user/pass/code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (!response.ok) {
      rejectWithValue(data.message);
    }

    return data;
  } catch (error: any) {
    rejectWithValue(error);
  }
});

export const slicer = createSlice({
  name: "slice",
  initialState,
  reducers: {
    logout: (state) => {
      state.validToken = false;
      localStorage.removeItem("Token");
    },
    registrationUserData: (state, action: PayloadAction<Registration>) => {
      state.registrationData = action.payload;
    },
    sendCode: (state, action: PayloadAction<string>) => {
      state.registrationCode = action.payload;
    },
    setCategory: (state, action: PayloadAction<CategoryValues>) => {
      state.searchCategoryValues.location = action.payload.location;
      state.searchCategoryValues.price = action.payload.price;
      state.searchCategoryValues.propertyType = action.payload.propertyType;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkToken.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.validToken = action.payload.success;
        state.user = action.payload.userDetails;
        state.userLandlordId = action.payload.userDetails.id;
        localStorage.setItem("userId", JSON.stringify(state.user.id));
      })
      .addCase(checkToken.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resetPass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPass.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.resetPassUserEmail = action.payload.email;
      })
      .addCase(resetPass.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, registrationUserData, sendCode, setCategory } =
  slicer.actions;

export default slicer.reducer;
