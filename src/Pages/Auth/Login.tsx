import { useState } from "react";
import "@/App.css";
import Logo from "@/assets/logo4.png";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Terminal } from "lucide-react";
import { Link } from "react-router";
import { Alert, AlertTitle } from "@/components/ui/alert";
import authServices from "@/Services/authService";
import _ApiServices from "@/Services/apiServices";
import { useDispatch } from "react-redux";
import { setUser } from "@/Container/reducer/slicers/userSlicer";

interface Error {
  error: boolean;
  errorMessage: string;
}

function Login() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>({
    error: false,
    errorMessage: "",
  });

  const handleSignIn = async (provider: "google" | "github") => {
    try {
      setIsLoading(true);
      const authService = new authServices();
      const authMethod =
        provider === "google"
          ? authService.GoogleAutherzation
          : authService.GithubAutherzation;

      const { user } = await authMethod();
      // Validate required user data
      if (!user.uid || !user.email) {
        throw new Error("Incomplete user data received from provider");
      }

      // Prepare user data payload
      const userData = {
        oauthId: user.uid,
        name: user.displayName || "",
        email: user.email,
        profileURL: user.photoURL || "",
        emailVerified: user.emailVerified || false,
      };

      const response: any = await new _ApiServices(
        "/auth/login",
        userData
      )._handlePostRequest();

      // Update application state
      if (response?.user) {
        dispatch(setUser(response.user));
      } else {
        throw new Error("User data not returned from API");
      }
      // Handle redirect logic
      const searchParams = new URLSearchParams(window.location.search);
      const redirectPath = searchParams.get("redirect");

      window.location.href = redirectPath || "/";
    } catch (err: unknown) {
      let errorMessage: string =
        "An unexpected error occurred. Please try again.";
      if (typeof err === "object" && err)
        if ("code" in err && "message" in err) {
          if (err.code) {
            switch (err.code) {
              case "auth/account-exists-with-different-credential":
                errorMessage =
                  "This email is already associated with a different sign-in method.";
                break;
              case "auth/popup-closed-by-user":
                errorMessage =
                  "Sign-in popup closed before completing authentication.";
                break;
              case "auth/network-request-failed":
                errorMessage =
                  "Network error. Please check your internet connection.";
                break;
              case "auth/user-disabled":
                errorMessage =
                  "This account has been disabled. Contact support.";
                break;
              case "auth/invalid-credential":
                errorMessage = "Invalid credentials. Please try again.";
                break;
              default:
                errorMessage = String(err.message) || "Authentication failed.";
            }
          }
        }

      setError({
        error: true,
        errorMessage: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error.error && (
        <Alert>
          <Terminal className="h-4 w-4" />
          <AlertTitle>{error.errorMessage}</AlertTitle>
        </Alert>
      )}
      <div className=" backdrop-blur-md sticky top-0 z-50 bg-white min-h-screen px-6">
        <div className=" mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              width={120}
              height={20}
              alt="Mentorsland Logo"
              className="object-contain"
            />
          </Link>
        </div>
        <div className="w-full mt-20">
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center justify-center w-full">
              <div className="w-[500px]">
                <div className={`text-black text-center  text-5xl`}>
                  Code. Learn. Excel.
                </div>
                <div className="text-black/90 text-xl mt-2 text-center">
                  Your journey to coding mastery starts here.
                </div>
                <div className="mt-12">
                  {isLoading ? (
                    <div className="py-3 px-7 cursor-pointer border border-black/70 rounded-lg flex items-center justify-center h-12 text-white/80">
                      <div className="w-4 h-4 bg-white animate-bounce rounded-full ml-1"></div>
                      <div className="w-4 h-4 bg-white animate-bounce rounded-full ml-1 delay-150"></div>
                      <div className="w-4 h-4 bg-white animate-bounce rounded-full ml-1 delay-300"></div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleSignIn("google")}
                      className="py-3 px-7 cursor-pointer border border-black/70 rounded-lg flex items-center justify-between text-black"
                    >
                      <FcGoogle size={23} />
                      <span className="ml-3 text-lg">Continue with Google</span>
                      <div></div>
                    </div>
                  )}
                  <div className="w-full items-center mt-3">
                    {isLoading ? (
                      <div className="py-3 px-7 cursor-pointer border border-white/70 rounded-lg flex items-center justify-center h-12 text-white/80">
                        <div className="w-4 h-4 bg-white animate-bounce rounded-full ml-1"></div>
                        <div className="w-4 h-4 bg-white animate-bounce rounded-full ml-1 delay-150"></div>
                        <div className="w-4 h-4 bg-white animate-bounce rounded-full ml-1 delay-300"></div>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleSignIn("github")}
                        className="py-3 px-7 cursor-pointer border border-black/70 rounded-lg flex items-center justify-between text-black"
                      >
                        <FaGithub size={23} />
                        <span className="ml-3 text-base">
                          Continue with Github
                        </span>
                        <div></div>
                      </div>
                    )}
                  </div>
                  {/* <div className="my-5 w-full h-[1px] bg-white/10"></div> */}
                </div>
                <div className="text-black/60 mt-14 text-sm text-center">
                  By continuing, you agree to MentorsLand&apos;s
                  <Link to="/terms" className="text-black underline ml-1">
                    Terms of Service
                  </Link>{" "}
                  and
                  <Link to="/privacy" className="text-black        underline ml-1">
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
