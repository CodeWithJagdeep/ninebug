import { FileX, Loader2 } from "lucide-react";
import { SubmissionDetailModal } from "./SubmissionDetailModal";
import { useEffect, useState } from "react";

// Demo submissions data
const demoSubmissions = [
  {
    id: "sub_001",
    status: "accepted",
    language: "JavaScript",
    runtime: 45,
    createdAt: "2024-06-15T14:30:00Z",
    score: 15,
    totalTests: 15,
    code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    testResults: [
      {
        input: "[2,7,11,15], target=9",
        output: "[0,1]",
        expected: "[0,1]",
        passed: true,
      },
      {
        input: "[3,2,4], target=6",
        output: "[1,2]",
        expected: "[1,2]",
        passed: true,
      },
      {
        input: "[3,3], target=6",
        output: "[0,1]",
        expected: "[0,1]",
        passed: true,
      },
    ],
  },
  {
    id: "sub_002",
    status: "wrong_answer",
    language: "Python",
    runtime: 89,
    createdAt: "2024-06-15T13:45:00Z",
    score: 12,
    totalTests: 15,
    code: `def twoSum(nums, target):
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []`,
    testResults: [
      {
        input: "[2,7,11,15], target=9",
        output: "[0,1]",
        expected: "[0,1]",
        passed: true,
      },
      {
        input: "[3,2,4], target=6",
        output: "[1,2]",
        expected: "[1,2]",
        passed: true,
      },
      {
        input: "[-1,-2,-3,-4,-5], target=-8",
        output: "[]",
        expected: "[2,4]",
        passed: false,
      },
    ],
  },
  {
    id: "sub_003",
    status: "time_limit_exceeded",
    language: "Java",
    runtime: 1000,
    createdAt: "2024-06-15T12:20:00Z",
    score: 8,
    totalTests: 15,
    code: `public int[] twoSum(int[] nums, int target) {
    for (int i = 0; i < nums.length; i++) {
        for (int j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] == target) {
                return new int[]{i, j};
            }
        }
    }
    return new int[]{};
}`,
    testResults: [
      {
        input: "[2,7,11,15], target=9",
        output: "[0,1]",
        expected: "[0,1]",
        passed: true,
      },
      {
        input: "Large array test case",
        output: "TLE",
        expected: "[999,1000]",
        passed: false,
      },
    ],
  },
  {
    id: "sub_004",
    status: "compilation_error",
    language: "C++",
    runtime: 0,
    createdAt: "2024-06-15T11:15:00Z",
    score: 0,
    totalTests: 15,
    code: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return {map[complement], i};
        }
        map[nums[i]] = i;
    }
    return {};
// Missing closing brace`,
    error: "Line 10: syntax error: expected '}' before end of file",
  },
  {
    id: "sub_005",
    status: "accepted",
    language: "Python",
    runtime: 52,
    createdAt: "2024-06-14T16:45:00Z",
    score: 15,
    totalTests: 15,
    code: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    testResults: [
      {
        input: "[2,7,11,15], target=9",
        output: "[0,1]",
        expected: "[0,1]",
        passed: true,
      },
      {
        input: "[3,2,4], target=6",
        output: "[1,2]",
        expected: "[1,2]",
        passed: true,
      },
      {
        input: "[3,3], target=6",
        output: "[0,1]",
        expected: "[0,1]",
        passed: true,
      },
    ],
  },
];

// Submissions Panel Component
export const SubmissionsPanel = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    // Simulate API call with demo data
    const fetchSubmissions = async () => {
      try {
        setLoading(true);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // In a real app, this would be:
        // const response = await fetch("/api/submissions");
        // const data = await response.json();

        // For demo purposes, use the demo data
        setSubmissions(demoSubmissions);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500 mb-2" />
          <p className="text-sm text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4 bg-black">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          My Submissions
        </h3>
        <p className="text-sm text-white/80">
          View your previous attempts and their results
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <FileX className="h-12 w-12 mb-4" />
          <p className="text-lg font-medium">No submissions yet</p>
          <p className="text-sm">Submit your solution to see it here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((submission: any, index) => (
            <div
              key={submission.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-white/5 cursor-pointer transition-colors"
              onClick={() => setSelectedSubmission(submission)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-white">
                    Submission #{submissions.length - index}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      submission.status === "accepted"
                        ? "bg-green-100 text-green-800"
                        : submission.status === "wrong_answer"
                        ? "bg-red-100 text-red-800"
                        : submission.status === "time_limit_exceeded"
                        ? "bg-orange-100 text-orange-800"
                        : submission.status === "compilation_error"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {submission.status.replace(/_/g, " ").toUpperCase()}
                  </span>
                </div>
                <span className="text-xs text-white/80">
                  {new Date(submission.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="text-sm text-white/90">
                Language: {submission.language} | Runtime:{" "}
                {submission.runtime > 0 ? `${submission.runtime}ms` : "N/A"}
              </div>

              {submission.score !== undefined && (
                <div className="text-sm text-white">
                  Score: {submission.score}/{submission.totalTests} tests passed
                </div>
              )}

              {submission.status === "compilation_error" && (
                <div className="text-sm text-red-600 mt-1">
                  Compilation failed
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Submission Detail Modal */}
      {selectedSubmission && (
        <SubmissionDetailModal
          submission={selectedSubmission}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
};
