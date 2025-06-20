// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slicers/productSlicer";
import userReducer from "./slicers/userSlicer";
import coursesReducer from "./slicers/coursesSlicer";
import codeReducer from "./slicers/CodingSlicer";
import progressReducer from "./slicers/ProgressSlicer";

export const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    courses: coursesReducer,
    code: codeReducer,
    progress: progressReducer,
  },
  devTools: true,
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
