export const CourseLoader = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {/* Animated Spinner */}
      <div className="border-4 border-white/30 border-t-white w-12 h-12 rounded-full animate-spin"></div>
      <div className="mt-6 text-white text-xs">Loading lesson...</div>
    </div>
  );
};
