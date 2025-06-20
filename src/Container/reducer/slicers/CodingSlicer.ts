// features/codeExecution/codeExecutionSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CodeExecutionState {
  status: "idle" | "running" | "success" | "error";
  output: string;
  executionTime: number | null;
  language: string;
  isDebugMode: boolean;
  lastRunTimestamp: number | null;
  hints: string[];
  tried: number;
}

const initialState: CodeExecutionState = {
  status: "idle",
  output: "",
  executionTime: null,
  language: "javascript",
  isDebugMode: false,
  lastRunTimestamp: null,
  tried: 0,
  hints: [],
};

const codeExecutionSlice = createSlice({
  name: "codeExecution",
  initialState,
  reducers: {
    executionStarted: (state) => {
      state.status = "running";
      state.output = "";
      state.executionTime = null;
    },
    executionSucceeded: (
      state,
      action: PayloadAction<{ output: string; executionTime: number }>
    ) => {
      state.status = "success";
      state.output = action.payload.output;

      state.executionTime = action.payload.executionTime;
      state.lastRunTimestamp = Date.now();
    },
    executionFailed: (
      state,
      action: PayloadAction<{ error: string; executionTime: number }>
    ) => {
      state.status = "error";
      state.output = action.payload.error;
      state.executionTime = action.payload.executionTime;
      state.lastRunTimestamp = Date.now();
    },
    executionStopped: (state) => {
      state.status = "idle";
      state.output = "Execution stopped by user";
    },
    setHints: (state, action: PayloadAction<{ hints: string[] }>) => {
      state.hints = action.payload.hints;
    },
    resetExecution: (state) => {
      state.status = "idle";
      state.output = "";
      state.executionTime = null;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleDebugMode: (state) => {
      state.isDebugMode = !state.isDebugMode;
    },
  },
});

export const {
  executionStarted,
  executionSucceeded,
  executionFailed,
  executionStopped,
  resetExecution,
  setLanguage,
  toggleDebugMode,
  setHints,
} = codeExecutionSlice.actions;

export default codeExecutionSlice.reducer;

export const selectCodeExecutionStatus = (state: RootState) =>
  state.code.status;

export const selectCodeExecutionOutput = (state: RootState) =>
  state.code.output;

export const selectCodeExecutionTime = (state: RootState) =>
  state.code.executionTime;

export const selectLanguage = (state: RootState) => state.code.language;

export const selectIsDebugMode = (state: RootState) => state.code.isDebugMode;

export const selectLastRunTimestamp = (state: RootState) =>
  state.code.lastRunTimestamp;

// Derived status flags
export const selectIsRunning = (state: RootState) =>
  state.code.status === "running";

export const selectIsSuccess = (state: RootState) =>
  state.code.status === "success";

export const selectIsError = (state: RootState) =>
  state.code.status === "error";

export const selectIsIdle = (state: RootState) => state.code.status === "idle";
export const selectHints = (state: RootState) => state.code.hints;
