import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "@/Container/reducer/store";

interface Props {
  children: React.ReactNode;
}

export default function InterviewRouteGuard({ children }: Props) {
  const interview = useSelector((state: RootState) => state.interview);
  const location = useLocation();

  const isValidRedux =
    typeof interview.company === "string" &&
    interview.company.length > 0 &&
    typeof interview.difficulty === "string" &&
    interview.difficulty.length > 0 &&
    typeof interview.mode === "string" &&
    interview.mode.length > 0;

  // ✅ check if URL starts with /byfriend/ and has a sessionId
  const isFriendJoining = /^\/byfriend\/[^/]+$/.test(location.pathname);

  const allowAccess = isValidRedux || isFriendJoining;

  if (!allowAccess) {
    return <Navigate to="/pre-interview" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
