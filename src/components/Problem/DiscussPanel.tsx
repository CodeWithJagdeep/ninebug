"use client";

import type React from "react";
import {
  Loader2,
  MessageCircle,
  ThumbsUp,
  Reply,
  Users,
  Clock,
  TrendingUp,
  Code,
  ChevronDown,
  ChevronUp,
  Copy,
  Pin,
  Award,
  Lightbulb,
  HelpCircle,
  Filter,
  Search,
  Plus,
  BookOpen,
  Zap,
  Target,
  ChevronLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Types
type User = {
  username: string;
  avatar: string | null;
  reputation: number;
  role: string;
  company?: string;
  badges?: string[];
};

type ApproachType =
  | "brute-force"
  | "optimized"
  | "alternative"
  | "question"
  | "discussion";

type Comment = {
  id: string;
  author: User;
  title?: string;
  content: string;
  approachType: ApproachType;
  timeComplexity?: string;
  spaceComplexity?: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  createdAt: Date;
  likes: number;
  isLiked: boolean;
  isPinned: boolean;
  replies: Comment[];
  tags: string[];
};

// Mock Data
const sampleDiscussions: Comment[] = [
  {
    id: "1",
    author: {
      username: "alice_dev",
      avatar: null,
      reputation: 1250,
      role: "Senior Engineer",
      company: "TechCorp",
      badges: ["Top Contributor", "Algorithm Expert"],
    },
    title: "HashMap Approach - Optimal Solution",
    content:
      "This is the most efficient approach using HashMap to achieve O(n) time complexity.",
    approachType: "optimized",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    codeSnippet: {
      language: "javascript",
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
    },
    createdAt: new Date(Date.now() - 3600000),
    likes: 42,
    isLiked: false,
    isPinned: true,
    replies: [
      {
        id: "r1",
        author: {
          username: "bob_coder",
          avatar: null,
          reputation: 890,
          role: "Software Engineer",
          company: "DevSolutions",
        },
        content: "Excellent explanation! I implemented a similar approach.",
        approachType: "discussion",
        createdAt: new Date(Date.now() - 1800000),
        likes: 12,
        isLiked: false,
        replies: [],
        isPinned: false,
        tags: ["feedback"],
      },
    ],
    tags: ["optimal", "hashmap", "javascript"],
  },
  {
    id: "2",
    author: {
      username: "diana_algorithms",
      avatar: null,
      reputation: 2100,
      role: "Tech Lead",
      company: "AlgoExperts",
      badges: ["Algorithm Master", "Top 1%"],
    },
    title: "Two Pointer Technique",
    content: "For sorted arrays, we can use the two-pointer technique.",
    approachType: "alternative",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    codeSnippet: {
      language: "python",
      code: `def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return [-1, -1]`,
    },
    createdAt: new Date(Date.now() - 7200000),
    likes: 38,
    isLiked: true,
    isPinned: true,
    replies: [],
    tags: ["two-pointer", "space-optimized", "python"],
  },
];

// Components
const ApproachForm = ({
  onSubmit,
  onCancel,
}: {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    approachType: "optimized" as ApproachType,
    timeComplexity: "",
    spaceComplexity: "",
    language: "javascript",
    code: "",
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    });
  };

  const approachTypes = [
    { value: "brute-force", label: "Brute Force", icon: Target },
    { value: "optimized", label: "Optimized", icon: Zap },
    { value: "alternative", label: "Alternative", icon: Lightbulb },
    { value: "question", label: "Question", icon: HelpCircle },
    { value: "discussion", label: "Discussion", icon: MessageCircle },
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <h3 className="text-lg font-semibold text-white">
          Share Your Approach
        </h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-gray-300">Approach Type</Label>
            <Select
              value={formData.approachType}
              onValueChange={(value: ApproachType) =>
                setFormData({ ...formData, approachType: value })
              }
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {approachTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <SelectItem
                      key={type.value}
                      value={type.value}
                      className="text-white hover:bg-gray-700"
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">Title</Label>
            <Input
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>

          <div>
            <Label className="text-gray-300">Explanation</Label>
            <Textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white h-24"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Time Complexity</Label>
              <Input
                value={formData.timeComplexity}
                onChange={(e) =>
                  setFormData({ ...formData, timeComplexity: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
            <div>
              <Label className="text-gray-300">Space Complexity</Label>
              <Input
                value={formData.spaceComplexity}
                onChange={(e) =>
                  setFormData({ ...formData, spaceComplexity: e.target.value })
                }
                className="bg-gray-800 border-gray-700 text-white"
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-300">Programming Language</Label>
            <Select
              value={formData.language}
              onValueChange={(value) =>
                setFormData({ ...formData, language: value })
              }
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="java">Java</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-gray-300">Code Solution</Label>
            <Textarea
              value={formData.code}
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white font-mono h-32"
            />
          </div>

          <div>
            <Label className="text-gray-300">Tags (comma-separated)</Label>
            <Input
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Post Approach
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const displayedCode = isExpanded
    ? code
    : code.split("\n").slice(0, 15).join("\n");
  const needsExpand = code.split("\n").length > 15;

  return (
    <div className="my-4 rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
      <div className="flex justify-between items-center bg-gray-800 px-4 py-3">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-mono text-gray-300 capitalize">
            {language}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={copyToClipboard}
            className="text-xs text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Copy className="h-3 w-3 mr-1" />
            {isCopied ? "Copied!" : "Copy"}
          </Button>
          {needsExpand && (
            <Button
              size="sm"
              variant="ghost"
              onClick={toggleExpand}
              className="text-xs text-gray-300 hover:text-white hover:bg-gray-700"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3 mr-1" />
                  Expand
                </>
              )}
            </Button>
          )}
        </div>
      </div>
      <pre
        className={`p-4 overflow-x-auto font-mono text-sm text-gray-200 ${
          !isExpanded && needsExpand ? "max-h-80 overflow-y-hidden" : ""
        }`}
      >
        <code>{displayedCode}</code>
      </pre>
    </div>
  );
};

const UserBadge = ({ user }: { user: User }) => {
  const roleColor = getRoleColor(user.role);

  return (
    <div className="flex items-center space-x-3">
      <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
        {user.username.charAt(0).toUpperCase()}
      </div>
      <div>
        <div className="flex items-center space-x-2">
          <span className="font-medium text-white">{user.username}</span>
          <Badge
            variant="secondary"
            className={`text-xs ${roleColor} bg-gray-800`}
          >
            {user.role}
          </Badge>
        </div>
        <div className="flex items-center space-x-3 mt-1">
          <span className="text-xs text-gray-400">{user.reputation} rep</span>
          {user.badges?.slice(0, 2).map((badge, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs text-yellow-400 border-yellow-600"
            >
              <Award className="h-3 w-3 mr-1" />
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

const ApproachCard = ({
  discussion,
  onLike,
  onReply,
  onViewDetails,
}: {
  discussion: Comment;
  onLike: (id: string) => void;
  onReply: (id: string) => void;
  onViewDetails: (discussion: Comment) => void;
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const getApproachIcon = (type: ApproachType) => {
    switch (type) {
      case "brute-force":
        return <Target className="h-4 w-4 text-orange-400" />;
      case "optimized":
        return <Zap className="h-4 w-4 text-green-400" />;
      case "alternative":
        return <Lightbulb className="h-4 w-4 text-yellow-400" />;
      case "question":
        return <HelpCircle className="h-4 w-4 text-blue-400" />;
      case "discussion":
        return <MessageCircle className="h-4 w-4 text-purple-400" />;
    }
  };

  const getApproachLabel = (type: ApproachType) => {
    switch (type) {
      case "brute-force":
        return "Brute Force";
      case "optimized":
        return "Optimized";
      case "alternative":
        return "Alternative";
      case "question":
        return "Question";
      case "discussion":
        return "Discussion";
    }
  };

  return (
    <div
      onClick={() => onViewDetails(discussion)}
      className={`bg-black px-4 py-4 border-white/30 border rounded-md hover:border-gray-700`}
    >
      <div className="py-2">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {discussion.isPinned && <Pin className="h-4 w-4 text-blue-400" />}
            {getApproachIcon(discussion.approachType)}
            <Badge
              variant="outline"
              className="text-xs border-gray-600 text-gray-300"
            >
              {getApproachLabel(discussion.approachType)}
            </Badge>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{formatTimeAgo(discussion.createdAt)}</span>
          </div>
        </div>

        <div className="mb-1">
          <h3 className="text-lg font-bold text-white mb-2">
            {discussion.title}
          </h3>
          {/* <UserBadge user={discussion.author} /> */}
        </div>

        <div className="mb-1">
          <p className="text-gray-300 text-sm leading-relaxed">
            {showFullContent
              ? discussion.content
              : `${discussion.content.slice(0, 200)}${
                  discussion.content.length > 200 ? "..." : "..."
                }`}
          </p>
          {/* {discussion.content.length > 200 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-blue-400 hover:text-blue-300 p-0 h-auto mt-2"
            >
              {showFullContent ? "Show less" : "Read more"}
            </Button>
          )} */}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLike(discussion.id)}
            className={`flex items-center space-x-1 ${
              discussion.isLiked
                ? "text-blue-400 hover:text-blue-300"
                : "text-gray-400 hover:text-blue-400"
            }`}
          >
            <ThumbsUp
              className={`h-2 w-2 ${discussion.isLiked ? "fill-current" : ""}`}
            />
            <span>{discussion.likes}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReply(discussion.id)}
            className="flex items-center space-x-2 text-gray-400 hover:text-blue-400"
          >
            <Reply className="h-4 w-4" />
            <span>{discussion.replies.length}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

const DetailedApproachView = ({
  discussion,
  comments,
  onBack,
  onLike,
  onAddComment,
  onReplyToComment,
  newComment,
  setNewComment,
  replyingToComment,
  setReplyingToComment,
}: {
  discussion: Comment;
  comments: Comment[];
  onBack: () => void;
  onLike: (id: string) => void;
  onAddComment: (discussionId: string) => void;
  onReplyToComment: (
    discussionId: string,
    commentId: string,
    replyContent: string
  ) => void;
  newComment: string;
  setNewComment: (comment: string) => void;
  replyingToComment: string | null;
  setReplyingToComment: (commentId: string | null) => void;
}) => {
  const [replyContent, setReplyContent] = useState("");

  const handleReply = (commentId: string) => {
    setReplyingToComment(replyingToComment === commentId ? null : commentId);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="text-gray-400 hover:text-white"
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to List
      </Button>

      <ApproachCard
        discussion={discussion}
        onLike={onLike}
        onReply={() => {}}
        onViewDetails={() => {}}
      />

      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Comments</h4>
        {comments.length === 0 ? (
          <p className="text-gray-500">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3 mb-2">
                <UserBadge user={comment.author} />
              </div>
              <p className="text-gray-300">{comment.content}</p>
              <div className="flex items-center space-x-4 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onLike(comment.id)}
                  className={`flex items-center space-x-2 ${
                    comment.isLiked
                      ? "text-blue-400 hover:text-blue-300"
                      : "text-gray-400 hover:text-blue-400"
                  }`}
                >
                  <ThumbsUp
                    className={`h-4 w-4 ${
                      comment.isLiked ? "fill-current" : ""
                    }`}
                  />
                  <span>{comment.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReply(comment.id)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-blue-400"
                >
                  <Reply className="h-4 w-4" />
                  <span>Reply</span>
                </Button>
              </div>

              {replyingToComment === comment.id && (
                <div className="mt-4">
                  <Textarea
                    placeholder="Write your reply..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                  <div className="flex justify-end space-x-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setReplyingToComment(null)}
                      className="text-gray-300 border-gray-700"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        onReplyToComment(
                          discussion.id,
                          comment.id,
                          replyContent
                        );
                        setReplyContent("");
                      }}
                    >
                      Submit Reply
                    </Button>
                  </div>
                </div>
              )}

              {comment.replies.length > 0 && (
                <div className="mt-4 ml-6 space-y-2">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-gray-800 border border-gray-700 rounded-lg p-3"
                    >
                      <div className="flex items-start space-x-3 mb-2">
                        <UserBadge user={reply.author} />
                      </div>
                      <p className="text-gray-400">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div>
        <Textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white"
        />
        <div className="flex justify-end mt-2">
          <Button onClick={() => onAddComment(discussion.id)}>
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  );
};

export function DiscussionPanel() {
  const [discussions, setDiscussions] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<
    "newest" | "oldest" | "most_liked" | "pinned"
  >("pinned");
  const [filterBy, setFilterBy] = useState<"all" | ApproachType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showApproachForm, setShowApproachForm] = useState(false);

  const [currentView, setCurrentView] = useState<"list" | "detail">("list");
  const [selectedDiscussion, setSelectedDiscussion] = useState<Comment | null>(
    null
  );
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState("");
  const [replyingToComment, setReplyingToComment] = useState<string | null>(
    null
  );

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setDiscussions(sampleDiscussions);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmitApproach = (formData: any) => {
    const newDiscussion: Comment = {
      id: Date.now().toString(),
      author: {
        username: "current_user",
        avatar: null,
        reputation: 450,
        role: "Developer",
      },
      title: formData.title,
      content: formData.content,
      approachType: formData.approachType,
      timeComplexity: formData.timeComplexity,
      spaceComplexity: formData.spaceComplexity,
      codeSnippet: formData.code
        ? {
            language: formData.language,
            code: formData.code,
          }
        : undefined,
      createdAt: new Date(),
      likes: 0,
      isLiked: false,
      isPinned: false,
      replies: [],
      tags: formData.tags,
    };

    setDiscussions([newDiscussion, ...discussions]);
    setShowApproachForm(false);
  };

  const handleLike = (id: string) => {
    setDiscussions(
      discussions.map((d) =>
        d.id === id
          ? { ...d, likes: d.likes + (d.isLiked ? -1 : 1), isLiked: !d.isLiked }
          : d
      )
    );
  };

  const handleViewDetails = (discussion: Comment) => {
    setSelectedDiscussion(discussion);
    setCurrentView("detail");
  };

  const handleBackToList = () => {
    setCurrentView("list");
    setSelectedDiscussion(null);
  };

  const handleAddComment = (discussionId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `comment_${Date.now()}`,
      author: {
        username: "current_user",
        avatar: null,
        reputation: 450,
        role: "Developer",
      },
      content: newComment,
      approachType: "discussion",
      createdAt: new Date(),
      likes: 0,
      isLiked: false,
      isPinned: false,
      replies: [],
      tags: ["comment"],
    };

    setComments((prev) => ({
      ...prev,
      [discussionId]: [...(prev[discussionId] || []), comment],
    }));
    setNewComment("");
  };

  const handleReplyToComment = (
    discussionId: string,
    commentId: string,
    replyContent: string
  ) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: `reply_${Date.now()}`,
      author: {
        username: "current_user",
        avatar: null,
        reputation: 450,
        role: "Developer",
      },
      content: replyContent,
      approachType: "discussion",
      createdAt: new Date(),
      likes: 0,
      isLiked: false,
      isPinned: false,
      replies: [],
      tags: ["reply"],
    };

    setComments((prev) => ({
      ...prev,
      [discussionId]:
        prev[discussionId]?.map((c) =>
          c.id === commentId ? { ...c, replies: [...c.replies, reply] } : c
        ) || [],
    }));
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-6 bg-gray-950">
        <div className="flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
          <p className="text-gray-300 font-medium">Loading discussions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-black text-gray-100">
      <div className="h-full overflow-auto">
        {currentView === "list" ? (
          <>
            <div className="sticky top-0 bg-black/95 backdrop-blur-sm border-b border-gray-800 p-6 z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#ed741a] rounded-lg">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      Algorithm Solutions Hub
                    </h2>
                    <p className="text-sm text-gray-400">
                      {discussions.length} approaches • Share and discover
                      optimal solutions
                    </p>
                  </div>
                </div>
                <Dialog
                  open={showApproachForm}
                  onOpenChange={setShowApproachForm}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-[#ed741a] cursor-pointer">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Approach
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-800">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Share Your Solution Approach
                      </DialogTitle>
                    </DialogHeader>
                    <ApproachForm
                      onSubmit={handleSubmitApproach}
                      onCancel={() => setShowApproachForm(false)}
                    />
                  </DialogContent>
                </Dialog>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      placeholder="Search approaches..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-black border border-white/40 h-9 rounded-md w-full  text-white"
                    />
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Select
                    value={filterBy}
                    onValueChange={(value: "all" | ApproachType) =>
                      setFilterBy(value)
                    }
                  >
                    <SelectTrigger className="w-40 bg-black border-white/40 text-white">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="optimized">Optimized</SelectItem>
                      <SelectItem value="brute-force">Brute Force</SelectItem>
                      <SelectItem value="alternative">Alternative</SelectItem>
                      <SelectItem value="question">Questions</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select
                    value={sortBy}
                    onValueChange={(
                      value: "newest" | "oldest" | "most_liked" | "pinned"
                    ) => setSortBy(value)}
                  >
                    <SelectTrigger className="w-40 bg-black border-white/40 text-white">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="pinned">Pinned First</SelectItem>
                      <SelectItem value="most_liked">Most Liked</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="py-6 px-4  mx-auto">
              {discussions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                  <div className="p-6 bg-black rounded-full mb-6">
                    <MessageCircle className="h-12 w-12 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    No approaches found
                  </h3>
                  <p className="text-center max-w-md mb-6">
                    Be the first to share a solution approach! Help the
                    community learn and grow.
                  </p>
                  <Button
                    onClick={() => setShowApproachForm(true)}
                    className="bg-white/5  border cursor-pointer border-white/30"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Share First Approach
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {discussions.map((discussion) => (
                    <ApproachCard
                      key={discussion.id}
                      discussion={discussion}
                      onLike={handleLike}
                      onReply={() => {}}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <DetailedApproachView
            discussion={selectedDiscussion!}
            comments={comments[selectedDiscussion?.id || ""] || []}
            onBack={handleBackToList}
            onLike={handleLike}
            onAddComment={handleAddComment}
            onReplyToComment={handleReplyToComment}
            newComment={newComment}
            setNewComment={setNewComment}
            replyingToComment={replyingToComment}
            setReplyingToComment={setReplyingToComment}
          />
        )}
      </div>
    </div>
  );
}

// Helper functions
function getRoleColor(role: string) {
  switch (role) {
    case "Tech Lead":
      return "text-purple-400";
    case "Senior Engineer":
      return "text-blue-400";
    case "Software Engineer":
      return "text-green-400";
    case "Junior Developer":
      return "text-yellow-400";
    case "Student":
      return "text-gray-400";
    default:
      return "text-gray-400";
  }
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}
