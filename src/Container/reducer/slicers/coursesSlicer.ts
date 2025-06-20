import Courses from "@/Services/CoursesService";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface Project {
  _id: string;
  title: string;
  description?: string;
  difficulty: "easy" | "medium" | "hard";
  lessonId?: string;
  isFree: boolean;
}

export interface Skill {
  _id: string;
  title: string;
  description: string;
}

export interface CertificateRequirements {
  minCompletion: number;
  requiredProjects: number;
  assessmentPassRate: number;
}

export interface SectionMeta {
  totalLessons: number;
  totalDuration: number;
  freeLessons: number;
  premiumLessons: number;
  certificateRequirements: CertificateRequirements;
}

/**
 * Represents a single lesson in a course module
 */
export interface ILessonModule {
  _id: string;
  title: string;
  type: "lecture" | "problem" | "interactive" | "quiz";
  difficulty?: "easy" | "medium" | "advanced" | "hard";
  lessonId?: string;
  duration?: number; // in minutes
  isFree?: boolean;
}

/**
 * Represents a module/section within a course
 */
export interface ICourseModule {
  _id?: string;
  title: string;
  description: string;
  lessons: ILessonModule[];
  order?: number;
}

/**
 * Main course document interface
 */
export interface ICourse {
  _id: string;
  title: string;
  modules: ICourseModule[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface IAccessPlan {
  planId: string;
  name: string;
  price: number;
  billingCycle: "monthly" | "quarterly" | "yearly" | "lifetime";
  features: string[];
}

export interface Section {
  _id: string;
  id?: string;
  title: string;
  description: string;
  price: number;
  language: "en" | "es" | "fr" | "hi" | "zh";
  level: "beginner" | "intermediate" | "advanced";
  rating: number;
  prerequisites: string[];
  certificateAvailable: boolean;
  skillsGained: Skill[];
  projects: Project[];
  tags: string[];
  reviews: string[];
  enrolledUser: string[];

  category: string;
  courseId?: string;
  meta: SectionMeta;
  isLocked: boolean;
  accessPlans: string[];
  freeTrialDays: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CoursesState {
  courses: Section[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  selectedCourse: Section | undefined | any;
  searchTerm: string;
  filter: "all" | "active" | "archived";
  loading: boolean;
}

// Initial state
const initialState: CoursesState = {
  courses: [],
  status: "idle",
  error: null,
  selectedCourse: null,
  searchTerm: "",
  filter: "all",
  loading: false,
};

// Async thunks
export const fetchCourses = createAsyncThunk<Section[]>(
  "courses/fetchCourses",
  async () => {
    try {
      const response = await Courses.getCourse();

      return response.data;
    } catch (err) {}
  }
);

export const addNewCourse = createAsyncThunk<Section, Partial<Section>>(
  "courses/addNewCourse",
  async (initialCourse) => {
    const response = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(initialCourse),
    });
    return await response.json();
  }
);

export const updateCourse = createAsyncThunk<Section, Section>(
  "courses/updateCourse",
  async (updatedCourse) => {
    const response = await fetch(`/api/courses/${updatedCourse._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCourse),
    });
    return await response.json();
  }
);

export const deleteCourse = createAsyncThunk<string, string>(
  "courses/deleteCourse",
  async (courseId) => {
    await fetch(`/api/courses/${courseId}`, {
      method: "DELETE",
    });
    return courseId;
  }
);

// Slice
const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    courseSelected(state, action: PayloadAction<Section>) {
      state.selectedCourse = action.payload;
    },
    searchTermChanged(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    filterChanged(state, action: PayloadAction<"all" | "active" | "archived">) {
      state.filter = action.payload;
    },
    resetSelectedCourse(state) {
      state.selectedCourse = null;
    },
    setLoading(state, action: PayloadAction<true | false>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch courses.";
      })
      .addCase(addNewCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index >= 0) {
          state.courses[index] = action.payload;
        }
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        const courseId = action.payload;
        state.courses = state.courses.filter(
          (course) => course._id !== courseId
        );
        if (state.selectedCourse?._id === courseId) {
          state.selectedCourse = null;
        }
      });
  },
});

// Exports
export const {
  courseSelected,
  searchTermChanged,
  filterChanged,
  resetSelectedCourse,
  setLoading,
} = coursesSlice.actions;

export default coursesSlice.reducer;

// Selectors
export const selectAllCourses = (state: { courses: CoursesState }) =>
  state.courses.courses;
export const selectCourseStatus = (state: { courses: CoursesState }) =>
  state.courses.status;
export const selectCourseError = (state: { courses: CoursesState }) =>
  state.courses.error;
export const selectSelectedCourse =
  (courseId: string) => (state: { courses: CoursesState }) => {
    return state.courses.courses.find(
      (course) => course.title.split(" ").join("-").toLowerCase() === courseId
    );
  };

export const selectCourseLoading = (state: { courses: CoursesState }) =>
  state.courses.loading;
export const selectSearchTerm = (state: { courses: CoursesState }) =>
  state.courses.searchTerm;
export const selectFilter = (state: { courses: CoursesState }) =>
  state.courses.filter;
