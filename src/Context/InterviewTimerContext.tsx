import React, { createContext, useContext, useEffect, useState } from "react";

interface InterviewTimerContextType {
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  triggerRunCode: () => void;
  setRunCodeCallback: (callback: () => void) => void;
}

const InterviewTimerContext = createContext<InterviewTimerContextType | null>(
  null
);

export const useInterviewTimer = () => {
  const context = useContext(InterviewTimerContext);
  if (!context) {
    throw new Error(
      "useInterviewTimer must be used within InterviewTimerProvider"
    );
  }
  return context;
};

export const InterviewTimerProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [runCodeCallback, setRunCodeCallbackInternal] = useState<() => void>(
    () => () => {}
  );

  useEffect(() => {
    if (timeLeft <= 0) {
      runCodeCallback();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, runCodeCallback]);

  return (
    <InterviewTimerContext.Provider
      value={{
        timeLeft,
        setTimeLeft,
        triggerRunCode: runCodeCallback,
        setRunCodeCallback: setRunCodeCallbackInternal,
      }}
    >
      {children}
    </InterviewTimerContext.Provider>
  );
};
