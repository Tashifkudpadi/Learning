import { configureStore } from "@reduxjs/toolkit";
import StudentsReducer from "./students";
import BatchesReducer from "./batches";
import FacultyReducer from "./faculties";
import SubjectsReducer from "./subjects";
import AuthReducer from "./auth";
import UserReducer from "./users";

export const store = configureStore({
  reducer: {
    userReducer: UserReducer,
    studentsReducer: StudentsReducer,
    batchesReducer: BatchesReducer,
    facultyReducer: FacultyReducer,
    subjectsReducer: SubjectsReducer,
    authReducer: AuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
