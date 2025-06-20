import { X } from "lucide-react";

// Submission Detail Modal Component
export const SubmissionDetailModal = ({ submission, onClose }: any) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-5/6 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Submission Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <p
                className={`text-sm ${
                  submission.status === "accepted"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submission.status.replace("_", " ").toUpperCase()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Runtime
              </label>
              <p className="text-sm">{submission.runtime}ms</p>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Code
            </label>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto text-sm">
              <code>{submission.code}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
