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

export interface SliceState {
  validToken: boolean;
  loading: boolean;
  error: string | null;
  registrationData: Registration;
  registrationCode: string;
  verified: boolean;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        checkToken.fulfilled,
        (state, action: PayloadAction<{ success: boolean }>) => {
          state.loading = false;
          state.validToken = action.payload.success;
        }
      )
      .addCase(checkToken.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, registrationUserData, sendCode } = slicer.actions;

export default slicer.reducer;
