import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axios";

interface Student {
  id: number;
  user: { id: number; first_name: string; last_name: string; email: string };
  primary_batch: { id: number; name: string } | null;
  batches: { id: number; name: string }[];
}

interface StudentState {
  students: Student[];
  error: string;
}

const initialState: StudentState = {
  students: [],
  error: "",
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    setStudents(state, action) {
      state.students = action.payload;
      state.error = "";
    },
    hasError(state, action) {
      state.error = action.payload;
    },
  },
});

export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async (_, { dispatch }) => {
    try {
      const response = await axiosInstance.get("/students");
      dispatch(setStudents(response.data));
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail || "Failed to fetch students";
      dispatch(hasError(errorMessage));
      throw error;
    }
  }
);

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (
    studentData: {
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      batch_id: number | null;
    },
    { dispatch }
  ) => {
    try {
      const response = await axiosInstance.post("/students", studentData);
      dispatch(fetchStudents());
      return response.data;
    } catch (error: any) {
      const errorMessage =
        typeof error.response?.data?.detail === "string"
          ? error.response.data.detail
          : error.response?.data?.detail?.map((e: any) => e.msg).join(", ") ||
            "Failed to add student";
      dispatch(hasError(errorMessage));
      throw error;
    }
  }
);

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (
    {
      studentId,
      studentData,
    }: {
      studentId: number;
      studentData: {
        first_name?: string;
        last_name?: string;
        email?: string;
        batch_id?: number | null;
      };
    },
    { dispatch }
  ) => {
    try {
      const response = await axiosInstance.put(
        `/students/${studentId}`,
        studentData
      );
      dispatch(fetchStudents());
      return response.data;
    } catch (error: any) {
      const errorMessage =
        typeof error.response?.data?.detail === "string"
          ? error.response.data.detail
          : error.response?.data?.detail?.map((e: any) => e.msg).join(", ") ||
            "Failed to update student";
      dispatch(hasError(errorMessage));
      throw error;
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (studentId: number, { dispatch }) => {
    try {
      await axiosInstance.delete(`/students/${studentId}`);
      dispatch(fetchStudents());
    } catch (error: any) {
      const errorMessage =
        typeof error.response?.data?.detail === "string"
          ? error.response.data.detail
          : error.response?.data?.detail?.map((e: any) => e.msg).join(", ") ||
            "Failed to delete student";
      dispatch(hasError(errorMessage));
      throw error;
    }
  }
);

export const { setStudents, hasError } = studentSlice.actions;
export default studentSlice.reducer;
