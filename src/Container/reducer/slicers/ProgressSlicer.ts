import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ICourseProgress } from "@/types/types";

interface ProgressState {
  progress: ICourseProgress[];
  currentCourseProgress: ICourseProgress | null;
  error: string | null;
  loading: boolean;
  
}

const initialState: ProgressState = {
  progress: [],
  currentCourseProgress: null,
  loading: false,
  error: null,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setProgress: (state, action: PayloadAction<ICourseProgress[] | []>) => {
      state.progress = action.payload;
    },

    // Set loading state
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },

    // Set error message
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { setLoading, setError, setProgress } = progressSlice.actions;

export const selectLoading = (state: RootState) => state.progress.loading;
export const selectError = (state: RootState) => state.progress.error;

export const getCourseProgressById =
  (courseId: string) => (state: RootState) => {
    const currentProgress = state.progress.progress.find(
      (state: ICourseProgress) => state.courseId == courseId
    );
    return currentProgress;
  };

export default progressSlice.reducer;
