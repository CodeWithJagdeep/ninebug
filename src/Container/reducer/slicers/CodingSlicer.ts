import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import _ApiServices from "@/Services/apiServices";

// ====== Interfaces ======

interface CodeExecutionState {
  currentQuestion: IQuestion | null;
  status: "idle" | "running" | "success" | "error";
  output: string;
  executionTime: number | null;
  language: string;
  isDebugMode: boolean;
  lastRunTimestamp: number | null;
  hints: string[];
  tried: number;
  aihint: string;
  result: result[];
  submissions: any[];
}

export interface Example {
  input: string;
  output: string;
  explanation: string;
}

export interface OptimalComplexity {
  time: string;
  space: string;
}

export interface Company {
  name: string;
  logoUrl: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  actualOutput?: string;
  explanation?: string;
  isHidden?: boolean;
  isPassed?: boolean;
}

export interface IQuestion {
  _id: string;
  title: string;
  description: string;
  approach?: { type: string; description: string }[];
  problemStatement: string;
  testCases: TestCase[];
  constraints: string[];
  topics: string[];
  categories: string;
  companies: Company[];
  difficulty: "Easy" | "Medium" | "Hard";
  frequency: number;
  acceptanceRate?: number;
  successRate?: number;
  avgTimeToSolve?: number;
  solutions: {
    code: string;
    language: string;
  }[];
  preCode: {
    code: string;
    language: string;
  }[];
  starterCode: {
    code: string;
    language: string;
  }[];
  hints: string[];
  optimalComplexity?: OptimalComplexity;
  inputFormat?: string;
  outputFormat?: string;
  isPremium: boolean;
  isPublished: boolean;
  createdBy: string;
  updatedBy?: string;
  slug?: string;
  version: number;
  createdAt?: Date;
  updatedAt?: Date;
  solutionCount: number;
  tags: string[];
}

export interface QuestionResponse {
  question: IQuestion;
  submissions: [];
}

interface result {
  passed: boolean;
  input: string;
  expected: string;
  actual: string;
}
// ====== Initial State ======

const initialState: CodeExecutionState = {
  currentQuestion: null,
  status: "idle",
  aihint:
    "Hey there! Don't worry about the failed test case, it's a great start! The `return pass` isn't a valid return statement; you need to actually find and return the indices. Try using a dictionary or nested loops to search for the pair that sums to the target.",
  output: "",
  result: [
    {
      input: "4 9 2 7 11 15",
      expected: "[0, 1]",
      actual: `Command failed: echo "4 9 2 7 11 15" | python3 /home/jagdeep/Downloads/Project/mentorsland/apps/code-service/dist/temp/script_1751812705978_688g7z.py
  File "/home/jagdeep/Downloads/Project/mentorsland/apps/code-service/dist/temp/script_1751812705978_688g7z.py", line 3
    return pass
           ^^^^
  SyntaxError: invalid syntax`,
      passed: false,
    },
    {
      input: "4 9 2 7 11 15",
      expected: "[0, 1]",
      actual: `Command failed: echo "4 9 2 7 11 15" | python3 /home/jagdeep/Downloads/Project/mentorsland/apps/code-service/dist/temp/script_1751812705978_688g7z.py
  File "/home/jagdeep/Downloads/Project/mentorsland/apps/code-service/dist/temp/script_1751812705978_688g7z.py", line 3
    return pass
           ^^^^
  SyntaxError: invalid syntax`,
      passed: false,
    },
  ],
  executionTime: null,
  language: "javascript",
  isDebugMode: false,
  lastRunTimestamp: 1751812709186,
  tried: 0,
  hints: [],
  submissions: [],
};

// ====== Async Thunk ======

export const fetchCurrentQuestion = createAsyncThunk<QuestionResponse, string>(
  "codeExecution/fetchCurrentQuestion",
  async (slug: string) => {
    const res: any = await new _ApiServices(
      `/dsa/${slug}`,
      {}
    )._handleGetRequest();
    return res.data;
  }
);

// ====== Slice ======

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
      action: PayloadAction<{
        results: result[];
        aihint: string;
      }>
    ) => {
      state.status = "success";
      state.aihint = action.payload.aihint;
      state.result = action.payload.results;
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
    updateNewSubmission: (state, action: PayloadAction) => {
      state.submissions = [action.payload, ...state.submissions];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentQuestion.pending, (state) => {
        state.status = "running";
        state.currentQuestion = null;
        state.output = "";
      })
      .addCase(fetchCurrentQuestion.fulfilled, (state, action) => {
        state.status = "success";
        state.currentQuestion = action.payload.question;
        state.hints = action.payload.question.hints;
        state.submissions = action.payload.submissions;
      })
      .addCase(fetchCurrentQuestion.rejected, (state, action) => {
        state.status = "error";
        state.output =
          action.error.message || "Failed to load the current question.";
        state.currentQuestion = null;
      });
  },
});

// ====== Actions ======

export const {
  executionStarted,
  executionSucceeded,
  executionFailed,
  executionStopped,
  resetExecution,
  setLanguage,
  toggleDebugMode,
  setHints,
  updateNewSubmission,
} = codeExecutionSlice.actions;

// ====== Reducer ======

export default codeExecutionSlice.reducer;

// ====== Selectors ======

export const selectCurrentQuestion = (state: RootState) =>
  state.code.currentQuestion;
export const selectCodingState = (state: RootState) => state.code;

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

export const selectHints = (state: RootState) => state.code.hints;

// Derived flags
export const selectIsRunning = (state: RootState) =>
  state.code.status === "running";

export const selectIsSuccess = (state: RootState) =>
  state.code.status === "success";

export const selectIsError = (state: RootState) =>
  state.code.status === "error";

export const selectIsIdle = (state: RootState) => state.code.status === "idle";
