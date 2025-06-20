import { signInWithPopup } from "firebase/auth";
import {
  auth,
  githubProvider,
  googleProvider,
} from "@/Container/firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth/web-extension";

import _ApiServices from "./apiServices";
import { ICourseProgress, UserProfile } from "@/types/types";
import { toast } from "sonner";

interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: UserProfile;
  isAuthenticated?: boolean;
  data?: any;
  valid?: boolean;
  progress: ICourseProgress[];
  // Add other response fields as needed
}

class authServices {
  /**
   * Verifies authentication token
   * @returns Promise with verification response
   */
  async verifyToken(): Promise<AuthResponse | null> {
    try {
      const response: any = await new _ApiServices(
        "/auth/me",
        {}
      )._handleGetRequest();
      return response.data;
    } catch (error: any) {
      console.error("GET Request Error:", error);

      // Fail gracefully
      return null;
    }
  }

  async GoogleAutherzation() {
    try {
      // Directly return the resolved Promise from signInWithPopup
      const result = await signInWithPopup(auth, googleProvider);

      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // The signed-in user info.
      const user = result.user;

      return { token, user }; // Return token and user info
    } catch (error) {
      console.error("Google Authorization Error:", error);
      throw error; // Re-throw the error for further handling
    }
  }

  async GithubAutherzation() {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.

      const user = result.user;
      return { user }; // Return token and user info
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  /**
   * Handles user logout
   * @returns Promise with logout response
   */
  async logout(): Promise<{ success: boolean; message: string }> {
    try {
      // Optional: Call backend logout endpoint if needed
      const response: any = await new _ApiServices(
        "/auth/logout",
        {}
      )._handleGetRequest();

      return {
        success: true,
        message: response.data?.message || "Logged out successfully",
      };
    } catch (error) {
      console.error("Logout Error:", error);
      // Even if backend logout fails, we still clear the client-side token
      // this.clearAuthToken();
      toast(error as string, {
        description: "Logout failed but local session was cleared",
      });
      // window.location.replace("/in/auth");
      return {
        success: false,
        message: this.getErrorMessage(
          error,
          "Logout failed but local session was cleared"
        ),
      };
    }
  }

  // ================ PRIVATE METHODS ================

  /**
   * Clears authentication token
   */
  private clearAuthToken(): void {
    // Clear token from storage
    document.cookie =
      "authToken=; Secure; HttpOnly; SameSite=Strict; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  /**
   * Extracts error message from API error
   * @param error The caught error
   * @param defaultMessage Default message if error parsing fails
   * @returns Error message string
   */
  private getErrorMessage(error: any, defaultMessage: string): string {
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    if (error?.message) {
      return error.message;
    }
    return defaultMessage;
  }

  async getDoubtSolve(data: {
    question: string;
    user: { id: string; name: string };
    topic?: string;
    resume?: string;
  }) {
    try {
      const response = await new _ApiServices(
        "/doubt/ask-ai",
        data
      )._handlePostRequest();
      return response;
    } catch (err: any) {
      return err.message;
    }
  }
}

export default authServices;
