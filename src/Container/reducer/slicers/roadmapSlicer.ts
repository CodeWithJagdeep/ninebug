import _ApiServices from "@/Services/apiServices";
import { Feedback, QuestionStatus, Roadmap } from "@/types/roadmap";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
// import { AxiosResponse } from "axios";

// ==== State Type ====
interface RoadmapState {
  savedRoadmaps: Roadmap[];
  roadmaps: Roadmap[];
  activeRoadmapId: string | null;
  completedQuestions: Record<string, QuestionStatus>;
  aiFeedback: Record<string, Feedback>;
  loading: boolean;
  error: string | null;
}

export const initialState: RoadmapState = {
  savedRoadmaps: [],
  roadmaps: [],
  activeRoadmapId: null,
  completedQuestions: {},
  aiFeedback: {},
  loading: false,
  error: null,
};

// Fetch all available roadmaps
export const fetchRoadmaps = createAsyncThunk<Roadmap[]>(
  "roadmap/fetchRoadmaps",
  async () => {
    const res: any = await new _ApiServices(
      "/dsa/roadmaps",
      {}
    )._handleGetRequest();
    return res.data.data;
  }
);

// Fetch AI feedback for a specific question
export const fetchAIFeedback = createAsyncThunk<
  { questionId: string; feedback: Feedback },
  string
>("roadmap/fetchAIFeedback", async (questionId) => {
  const res = await axios.get<Feedback>(`/api/feedback/${questionId}`);
  return { questionId, feedback: res.data };
});
// ==== Slice ====

const roadmapSlice = createSlice({
  name: "roadmap",
  initialState,
  reducers: {
    saveRoadmap(state, action: PayloadAction<Roadmap>) {
      const roadmap = action.payload;
      if (!state.savedRoadmaps.some((r) => r._id === roadmap._id)) {
        state.savedRoadmaps.push(roadmap);
      }
    },
    setActiveRoadmap(state, action: PayloadAction<string>) {
      state.activeRoadmapId = action.payload;
    },
    markQuestionSolved(
      state,
      action: PayloadAction<{
        questionId: string;
        status: "attempted" | "solved";
      }>
    ) {
      const { questionId, status } = action.payload;
      state.completedQuestions[questionId] = {
        status,
        timestamp: new Date().toISOString(),
      };
    },
    clearRoadmapState() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRoadmaps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoadmaps.fulfilled, (state, action) => {
        state.roadmaps = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoadmaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch roadmaps";
      });

    builder.addCase(fetchAIFeedback.fulfilled, (state, action) => {
      const { questionId, feedback } = action.payload;
      state.aiFeedback[questionId] = {
        ...feedback,
        updatedAt: new Date().toISOString(),
      };
    });
  },
});

export const {
  saveRoadmap,
  setActiveRoadmap,
  markQuestionSolved,
  clearRoadmapState,
} = roadmapSlice.actions;

export default roadmapSlice.reducer;

// ==== Basic Selectors ====
export const selectRoadmapState = (state: RootState) => state.roadmap;

export const selectRoadmaps = (state: RootState) => state.roadmap.roadmaps;

export const selectSavedRoadmaps = (state: RootState) =>
  state.roadmap.savedRoadmaps;

export const selectActiveRoadmapId = (state: RootState) =>
  state.roadmap.activeRoadmapId;

export const selectCompletedQuestions = (state: RootState) =>
  state.roadmap.completedQuestions;

export const selectAIFeedback = (state: RootState) => state.roadmap.aiFeedback;

export const selectLoading = (state: RootState) => state.roadmap.loading;

export const selectError = (state: RootState) => state.roadmap.error;
