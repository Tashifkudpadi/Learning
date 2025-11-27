import { API_CONFIG } from "@/utils/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchCourses = createAsyncThunk("courses/fetchAll", async () => {
  const res = await axios.get(
    `${API_CONFIG.BASE_API}${API_CONFIG.COURSES_API_URL}`
  );
  return res.data;
});

export const createCourse = createAsyncThunk(
  "courses/create",
  async (payload: any) => {
    const res = await axios.post(
      `${API_CONFIG.BASE_API}${API_CONFIG.COURSES_API_URL}`,
      payload
    );
    return res.data;
  }
);

export const fetchCourseById = createAsyncThunk(
  "courses/fetchById",
  async (id: string) => {
    const res = await axios.get(
      `${API_CONFIG.BASE_API}${API_CONFIG.COURSES_API_URL}/${id}`
    );
    return res.data;
  }
);

// Update a course by ID (PUT)
export const updateCourse = createAsyncThunk(
  "courses/update",
  async ({ id, payload }: { id: string | number; payload: any }) => {
    const res = await axios.put(
      `${API_CONFIG.BASE_API}${API_CONFIG.COURSES_API_URL}/${id}`,
      payload
    );
    return res.data;
  }
);

// Delete a course by ID (DELETE)
export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (id: string | number) => {
    const res = await axios.delete(
      `${API_CONFIG.BASE_API}${API_CONFIG.COURSES_API_URL}/${id}`
    );
    return { id, data: res.data };
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    list: [] as any[],
    selected: null as any,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    // ✅ manual error reset (e.g., when closing dialog)
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null; // ✅ clear error on success
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
        state.error = null; // ✅ clear error on success
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch course";
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.list.push(action.payload);
        state.error = null; // ✅ clear error on success
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create course";
      })
      // Update course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload;
        // Replace in list if exists
        const idx = state.list.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
        state.error = null;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update course";
      })
      // Delete course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((c) => c.id !== action.payload.id);
        // If the deleted course is selected, clear it
        if (state.selected && state.selected.id === action.payload.id) {
          state.selected = null;
        }
        state.error = null;
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete course";
      });
  },
});

export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;
