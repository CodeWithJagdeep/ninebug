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
import { useTranslation } from "react-i18next";
import { setUser } from "@/Container/reducer/slicers/userSlicer";

interface Error {
  error: boolean;
  errorMessage: string;
}

function Login() {
  const { t } = useTranslation();
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
      if (!user.uid || !user.email) {
        throw new Error(t("login.errors.incompleteData"));
      }

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

      if (response?.data?.user) {
        dispatch(setUser(response.data.user));
      } else {
        throw new Error(t("login.errors.noUserData"));
      }

      const searchParams = new URLSearchParams(window.location.search);
      const redirectPath = searchParams.get("redirect");
      window.location.href = redirectPath || "/in/dashboard";
    } catch (err: unknown) {
      let errorMessage: string = t("login.errors.default");
      if (typeof err === "object" && err)
        if ("code" in err && "message" in err) {
          if (err.code) {
            switch (err.code) {
              case "auth/account-exists-with-different-credential":
                errorMessage = t("login.errors.accountExists");
                break;
              case "auth/popup-closed-by-user":
                errorMessage = t("login.errors.popupClosed");
                break;
              case "auth/network-request-failed":
                errorMessage = t("login.errors.networkError");
                break;
              case "auth/user-disabled":
                errorMessage = t("login.errors.accountDisabled");
                break;
              case "auth/invalid-credential":
                errorMessage = t("login.errors.invalidCredentials");
                break;
              default:
                errorMessage =
                  String(err.message) || t("login.errors.authFailed");
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
      <div className="backdrop-blur-md sticky top-0 z-50 bg-white min-h-screen px-6">
        <div className="mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src={Logo}
              width={120}
              height={20}
              alt={t("login.logoAlt")}
              className="object-contain"
            />
          </Link>
        </div>
        <div className="w-full mt-20">
          <div className="w-full flex flex-col items-center">
            <div className="flex items-center justify-center w-full">
              <div className="w-[500px]">
                <div className={`text-black text-center text-5xl`}>
                  {t("login.heading")}
                </div>
                <div className="text-black/90 text-xl mt-2 text-center">
                  {t("login.subheading")}
                </div>
                <div className="mt-12">
                  {isLoading ? (
                    <div className="py-3 px-7 cursor-pointer border border-black/70 rounded-lg flex items-center justify-center h-12 text-white/80">
                      <div className="w-4 h-4 bg-black animate-bounce rounded-full ml-1"></div>
                      <div className="w-4 h-4 bg-black animate-bounce rounded-full ml-1 delay-150"></div>
                      <div className="w-4 h-4 bg-black animate-bounce rounded-full ml-1 delay-300"></div>
                    </div>
                  ) : (
                    <div
                      onClick={() => handleSignIn("google")}
                      className="py-3 px-7 cursor-pointer border border-black/70 rounded-lg flex items-center justify-between text-black"
                    >
                      <FcGoogle size={23} />
                      <span className="ml-3 text-lg">
                        {t("login.continueGoogle")}
                      </span>
                      <div></div>
                    </div>
                  )}
                  <div className="w-full items-center mt-3">
                    {isLoading ? (
                      <div className="py-3 px-7 cursor-pointer border border-black/70 rounded-lg flex items-center justify-center h-12 text-white/80">
                        <div className="w-4 h-4 bg-black animate-bounce rounded-full ml-1"></div>
                        <div className="w-4 h-4 bg-black animate-bounce rounded-full ml-1 delay-150"></div>
                        <div className="w-4 h-4 bg-black animate-bounce rounded-full ml-1 delay-300"></div>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleSignIn("github")}
                        className="py-3 px-7 cursor-pointer border border-black/70 rounded-lg flex items-center justify-between text-black"
                      >
                        <FaGithub size={23} />
                        <span className="ml-3 text-base">
                          {t("login.continueGithub")}
                        </span>
                        <div></div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-black/60 mt-14 text-sm text-center">
                  {t("login.termsText")}
                  <Link to="/terms" className="text-black underline ml-1">
                    {t("login.termsLink")}
                  </Link>{" "}
                  {t("login.andText")}
                  <Link to="/privacy" className="text-black underline ml-1">
                    {t("login.privacyLink")}
                  </Link>
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
