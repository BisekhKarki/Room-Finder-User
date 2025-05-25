import { base_url } from "@/constants/BaseUrl";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Add User interface
interface User {
  id: string;
  email: string;
  // Add other user properties as needed
}

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
  user: User | null; // Changed from Array<any>
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
  user: null, // Changed from empty array
  userLandlordId: "",
  searchCategoryValues: {
    location: "",
    price: "",
    propertyType: "",
  },
};

// Updated checkToken with proper types
export const checkToken = createAsyncThunk<
  { success: boolean; userDetails: User },
  { token: string },
  { rejectValue: string }
>("checkToken", async ({ token }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/user/verify/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message || "Invalid token");
    }

    const val = await response.json();
    return val;
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
  }
});

// Updated resetPass with proper types
export const resetPass = createAsyncThunk<
  { success: boolean },
  { email: string },
  { rejectValue: string }
>("resetPass", async ({ email }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${base_url}/user/pass/code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData.message);
    }

    const data = await response.json();
    return data as { success: boolean };
  } catch (error: unknown) {
    return rejectWithValue(
      error instanceof Error ? error.message : "An unknown error occurred"
    );
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
      state.searchCategoryValues = action.payload;
    },
    setResetUserEmail: (state, action: PayloadAction<string>) => {
      state.resetPassUserEmail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        checkToken.fulfilled,
        (
          state,
          action: PayloadAction<{ success: boolean; userDetails: User }>
        ) => {
          state.loading = false;
          state.validToken = action.payload.success;
          state.user = action.payload.userDetails;
          state.userLandlordId = action.payload.userDetails.id;
          localStorage.setItem(
            "userId",
            JSON.stringify(action.payload.userDetails.id)
          );
        }
      )
      .addCase(
        checkToken.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Authentication failed";
        }
      )
      .addCase(resetPass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPass.fulfilled, (state) => {
        state.loading = false;
        // Use the email from the thunk argument if needed
        // state.resetPassUserEmail = action.meta.arg.email;
      })
      .addCase(
        resetPass.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Password reset failed";
        }
      );
  },
});

export const {
  logout,
  registrationUserData,
  sendCode,
  setCategory,
  setResetUserEmail,
} = slicer.actions;

export default slicer.reducer;
