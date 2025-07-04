import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setInterviewDetails } from "@/Container/reducer/slicers/interviewSlice";

const companies = [
  { value: "FANG", label: "FANG" },
  { value: "Google", label: "Google" },
  { value: "Amazon", label: "Amazon" },
  { value: "Microsoft", label: "Microsoft" },
  { value: "Apple", label: "Apple" },
  { value: "Netflix", label: "Netflix" },
  { value: "Meta", label: "Meta" },
  { value: "Uber", label: "Uber" },
  { value: "Airbnb", label: "Airbnb" },
];

const difficulties = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const interviewModes = [
  { value: "ai", label: "By AI" },
  { value: "friend", label: "By Friend" },
];
 function InterviewForm() {
  const [company, setCompany] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [mode, setMode] = useState<"ai" | "friend">("ai");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !difficulty) {
      alert("Please select all options");
      return;
    }

    dispatch(setInterviewDetails({ company, difficulty, mode }));

    if (mode === "ai") {
      navigate("/interview");
    } else {
      // friend mode: generate session
      const sessionId = crypto.randomUUID(); // or any random ID generator
      navigate(`/byfriend/${sessionId}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Interview Preparation</CardTitle>
          <CardDescription className="text-gray-400">
            Select your interview preferences to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-white">Company</Label>
              <Select value={company} onValueChange={setCompany}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {companies.map((company) => (
                    <SelectItem
                      key={company.value}
                      value={company.value}
                      className="hover:bg-gray-700"
                    >
                      {company.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select difficulty level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {difficulties.map((difficulty) => (
                    <SelectItem
                      key={difficulty.value}
                      value={difficulty.value}
                      className="hover:bg-gray-700"
                    >
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Interview Mode</Label>
              <RadioGroup
                value={mode}
                onValueChange={(value) => setMode(value as "ai" | "friend")}
                className="flex space-x-4"
              >
                {interviewModes.map((interviewMode) => (
                  <div
                    key={interviewMode.value}
                    className="flex items-center space-x-2"
                  >
                    <RadioGroupItem
                      value={interviewMode.value}
                      id={interviewMode.value}
                      className="text-blue-500 border-gray-600"
                    />
                    <Label htmlFor={interviewMode.value} className="text-white">
                      {interviewMode.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start Interview
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default InterviewForm;