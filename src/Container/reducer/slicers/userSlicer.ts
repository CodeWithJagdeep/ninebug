// src/features/user/userSlice.ts
import { UserProfile } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// Adjust import path as needed
// import type { RootState } from "@/app/store"; // Adjust import path as needed

// Define the user state interface based on your IUser
interface UserState {
  currentUser: UserProfile | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isAuthenticated: boolean;
}

// Initial state
const initialState: UserState = {
  currentUser: null,
  status: "idle",
  error: null,
  isAuthenticated: false,
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Synchronous actions
    setUser: (state, action: PayloadAction<UserProfile>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
    updateCoins: (state, action: PayloadAction<number>) => {
      if (state.currentUser) {
        state.currentUser.coins = action.payload;
      }
    },
  },
});

// Export actions
export const { setUser, clearUser, updateCoins } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserCoins = (state: RootState) =>
  state.user.currentUser?.coins || 0;

// Export the reducer
export default userSlice.reducer;
