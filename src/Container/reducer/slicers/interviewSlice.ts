import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InterviewState {
  company: string;
  difficulty: string;
  mode: "ai" | "friend";
}

const initialState: InterviewState = {
  company: "",
  difficulty: "",
  mode: "ai",
};

export const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    setInterviewDetails: (state, action: PayloadAction<InterviewState>) => {
      state.company = action.payload.company;
      state.difficulty = action.payload.difficulty;
      state.mode = action.payload.mode;
    },
  },
});

export const { setInterviewDetails } = interviewSlice.actions;
export default interviewSlice.reducer;
