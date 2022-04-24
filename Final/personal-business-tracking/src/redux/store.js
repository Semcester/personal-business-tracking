import { configureStore } from "@reduxjs/toolkit"
import jobsReducer from "../features/JobSlice"

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
  },
})
