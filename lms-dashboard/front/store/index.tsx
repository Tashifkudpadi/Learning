import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./users";
import studentsReducer from "./students";
import batchesReducer from "./batches";
import facultyReducer from "./faculties";
import subjectsReducer from "./subjects";

export const store = configureStore({
  reducer: {
    users: userReducer,
    // students: studentReducer,
    // batches: batchReducer,
    // faculty: facultyReducer,
    // subjects: subjectReducer,

    batches: batchesReducer,
    students: studentsReducer,
    faculty: facultyReducer,
    subjects: subjectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
