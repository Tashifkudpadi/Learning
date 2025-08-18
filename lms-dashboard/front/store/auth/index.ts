// store/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  email: string;
  role: "student" | "faculty" | "admin";
  student_id?: number;
  faculty_id?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// ✅ Async thunk for login/register
export const authAction = createAsyncThunk(
  "auth/authAction",
  async (
    { data, type }: { data: any; type: "signin" | "signup" },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/auth/${
          type === "signin" ? "login" : "register"
        }`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );

      // Save in localStorage
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return response.data; // { access_token, user }
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.detail || "Authentication failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token) {
        state.token = token;
      }

      if (user) {
        try {
          state.user = JSON.parse(user);
        } catch (e) {
          console.error("Failed to parse user from localStorage", e);
          state.user = null;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authAction.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
      })
      .addCase(authAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
