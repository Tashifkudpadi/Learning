import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";

interface Faculty {
  id: number;
  user: { id: number; first_name: string; last_name: string; email: string };
  subjects: { id: number; name: string; code: string }[];
}

interface FacultyState {
  faculty: Faculty[];
  error: string;
}

const initialState: FacultyState = {
  faculty: [],
  error: "",
};

const facultySlice = createSlice({
  name: "faculty",
  initialState,
  reducers: {
    setFaculty(state, action) {
      state.faculty = action.payload;
      state.error = "";
    },
    hasError(state, action) {
      state.error = action.payload;
    },
  },
});

export const fetchFaculty = createAsyncThunk(
  "faculty/fetchFaculty",
  async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.get("/faculty");
      dispatch(setFaculty(response.data));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch faculty";
      dispatch(hasError(errorMessage));
    }
  }
);

export const addFaculty = createAsyncThunk(
  "faculty/addFaculty",
  async (
    facultyData: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      subject_ids: number[];
    },
    { dispatch }
  ) => {
    try {
      const response = await axiosInstance.post("/faculty", facultyData);
      dispatch(fetchFaculty());
      return response.data;
    } catch (error: any) {
      const errorMessage =
        typeof error.response?.data?.detail === "string"
          ? error.response.data.detail
          : error.response?.data?.detail?.map((e: any) => e.msg).join(", ") ||
            "Failed to add faculty";
      dispatch(hasError(errorMessage));
      throw error;
    }
  }
);

export const updateFaculty = createAsyncThunk(
  "faculty/updateFaculty",
  async (
    {
      facultyId,
      facultyData,
    }: {
      facultyId: number;
      facultyData: {
        first_name?: string;
        last_name?: string;
        email?: string;
        subject_ids?: number[];
      };
    },
    { dispatch }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/faculty/${facultyId}`,
        facultyData
      );
      dispatch(fetchFaculty());
      return response.data;
    } catch (error: any) {
      const errorMessage =
        typeof error.response?.data?.detail === "string"
          ? error.response.data.detail
          : error.response?.data?.detail?.map((e: any) => e.msg).join(", ") ||
            "Failed to update faculty";
      dispatch(hasError(errorMessage));
      throw error;
    }
  }
);

export const deleteFaculty = createAsyncThunk(
  "faculty/deleteFaculty",
  async (facultyId: number, { dispatch }) => {
    try {
      await axiosInstance.delete(`/faculty/${facultyId}`);
      dispatch(fetchFaculty());
    } catch (error: any) {
      const errorMessage =
        typeof error.response?.data?.detail === "string"
          ? error.response.data.detail
          : error.response?.data?.detail?.map((e: any) => e.msg).join(", ") ||
            "Failed to delete faculty";
      dispatch(hasError(errorMessage));
      throw error;
    }
  }
);

export const { setFaculty, hasError } = facultySlice.actions;
export default facultySlice.reducer;
