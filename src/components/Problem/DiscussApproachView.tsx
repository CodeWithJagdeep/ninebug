"use client";
import { useState } from "react";
import {
  ArrowLeft,
  ThumbsUp,
  MessageCircle,
  Reply,
  Clock,
  Award,
  Pin,
  Code,
  Target,
  Zap,
  Lightbulb,
  HelpCircle,
  Send,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Import types from the main file
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
  replies: any[];
  tags: string[];
};

interface DetailedApproachViewProps {
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
  setNewComment: (value: string) => void;
  replyingToComment: string | null;
  setReplyingToComment: (value: string | null) => void;
}

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
    : code.split("\n").slice(0, 20).join("\n");
  const needsExpand = code.split("\n").length > 20;

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-gray-700 bg-gray-900">
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
      <pre className="p-4 overflow-x-auto font-mono text-sm text-gray-200">
        <code>{displayedCode}</code>
      </pre>
    </div>
  );
};

const UserBadge = ({
  user,
  size = "default",
}: {
  user: User;
  size?: "default" | "small";
}) => {
  const getRoleColor = (role: string) => {
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
  };

  const roleColor = getRoleColor(user.role);
  const avatarSize = size === "small" ? "h-8 w-8" : "h-10 w-10";
  const textSize = size === "small" ? "text-sm" : "text-base";

  return (
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <div
          className={`${avatarSize} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold`}
        >
          {user.username.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="min-w-0">
        <div className="flex items-center space-x-2 flex-wrap">
          <span className={`font-medium text-white ${textSize}`}>
            {user.username}
          </span>
          <Badge
            variant="secondary"
            className={`text-xs ${roleColor} bg-gray-800`}
          >
            {user.role}
          </Badge>
          {user.company && (
            <Badge
              variant="outline"
              className="text-xs text-gray-400 border-gray-600"
            >
              {user.company}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-3 mt-1">
          <span className="text-xs text-gray-400">{user.reputation} rep</span>
          {user.badges && user.badges.length > 0 && (
            <div className="flex space-x-1">
              {user.badges.slice(0, 2).map((badge, index) => (
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
          )}
        </div>
      </div>
    </div>
  );
};

const CommentItem = ({
  comment,
  discussionId,
  onReplyToComment,
  replyingToComment,
  setReplyingToComment,
  onLike,
  level = 0,
}: {
  comment: Comment;
  discussionId: string;
  onReplyToComment: (
    discussionId: string,
    commentId: string,
    replyContent: string
  ) => void;
  replyingToComment: string | null;
  setReplyingToComment: (value: string | null) => void;
  onLike: (id: string) => void;
  level?: number;
}) => {
  const [replyContent, setReplyContent] = useState("");

  const handleSubmitReply = () => {
    onReplyToComment(discussionId, comment.id, replyContent);
    setReplyContent("");
  };

  const formatTimeAgo = (date: Date) => {
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
  };

  const maxLevel = 3; // Maximum nesting level

  return (
    <div
      className={`${level > 0 ? "ml-6 pl-4 border-l-2 border-gray-800" : ""}`}
    >
      <Card className="bg-gray-900/50 border-gray-800 mb-4">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <UserBadge user={comment.author} size="small" />
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatTimeAgo(comment.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-gray-300 leading-relaxed">{comment.content}</p>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(comment.id)}
              className={`flex items-center space-x-1 ${
                comment.isLiked
                  ? "text-blue-400 hover:text-blue-300"
                  : "text-gray-400 hover:text-blue-400"
              }`}
            >
              <ThumbsUp
                className={`h-3.5 w-3.5 ${
                  comment.isLiked ? "fill-current" : ""
                }`}
              />
              <span>{comment.likes}</span>
            </Button>

            {level < maxLevel && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setReplyingToComment(
                    replyingToComment === comment.id ? null : comment.id
                  )
                }
                className="flex items-center space-x-1 text-gray-400 hover:text-blue-400"
              >
                <Reply className="h-3.5 w-3.5" />
                <span>Reply</span>
              </Button>
            )}
          </div>

          {/* Reply Form */}
          {replyingToComment === comment.id && (
            <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                className="bg-gray-800 border-gray-700 text-white mb-3"
                rows={3}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingToComment(null)}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmitReply}
                  disabled={!replyContent.trim()}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-3.5 w-3.5 mr-1" />
                  Reply
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              discussionId={discussionId}
              onReplyToComment={onReplyToComment}
              replyingToComment={replyingToComment}
              setReplyingToComment={setReplyingToComment}
              onLike={onLike}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export function DetailedApproachView({
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
}: DetailedApproachViewProps) {
  const getApproachIcon = (type: ApproachType) => {
    switch (type) {
      case "brute-force":
        return <Target className="h-5 w-5 text-orange-400" />;
      case "optimized":
        return <Zap className="h-5 w-5 text-green-400" />;
      case "alternative":
        return <Lightbulb className="h-5 w-5 text-yellow-400" />;
      case "question":
        return <HelpCircle className="h-5 w-5 text-blue-400" />;
      case "discussion":
        return <MessageCircle className="h-5 w-5 text-purple-400" />;
    }
  };

  const getApproachLabel = (type: ApproachType) => {
    switch (type) {
      case "brute-force":
        return "Brute Force Solution";
      case "optimized":
        return "Optimized Solution";
      case "alternative":
        return "Alternative Approach";
      case "question":
        return "Question";
      case "discussion":
        return "Discussion";
    }
  };

  const formatTimeAgo = (date: Date) => {
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
  };

  return (
    <div className="min-h-full bg-gray-950">
      {/* Header with Back Button */}
      <div className="sticky top-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 p-6 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to All Approaches
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            {discussion.isPinned && <Pin className="h-5 w-5 text-blue-400" />}
            {getApproachIcon(discussion.approachType)}
            <Badge variant="outline" className="border-gray-600 text-gray-300">
              {getApproachLabel(discussion.approachType)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Main Approach Card */}
        <Card
          className={`bg-gray-900 border-gray-800 mb-8 ${
            discussion.isPinned ? "ring-2 ring-blue-500/20" : ""
          }`}
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-white mb-4">
                  {discussion.title}
                </h1>
                <UserBadge user={discussion.author} />
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeAgo(discussion.createdAt)}</span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="mb-6">
              <p className="text-gray-300 leading-relaxed text-lg">
                {discussion.content}
              </p>
            </div>

            {(discussion.timeComplexity || discussion.spaceComplexity) && (
              <div className="flex space-x-4 mb-6">
                {discussion.timeComplexity && (
                  <Badge
                    variant="outline"
                    className="text-green-400 border-green-600 px-3 py-1"
                  >
                    Time: {discussion.timeComplexity}
                  </Badge>
                )}
                {discussion.spaceComplexity && (
                  <Badge
                    variant="outline"
                    className="text-blue-400 border-blue-600 px-3 py-1"
                  >
                    Space: {discussion.spaceComplexity}
                  </Badge>
                )}
              </div>
            )}

            {discussion.codeSnippet && (
              <CodeBlock
                language={discussion.codeSnippet.language}
                code={discussion.codeSnippet.code}
              />
            )}

            {discussion.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {discussion.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-800 text-gray-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center space-x-6 pt-6 border-t border-gray-800">
              <Button
                variant="ghost"
                onClick={() => onLike(discussion.id)}
                className={`flex items-center space-x-2 ${
                  discussion.isLiked
                    ? "text-blue-400 hover:text-blue-300"
                    : "text-gray-400 hover:text-blue-400"
                }`}
              >
                <ThumbsUp
                  className={`h-5 w-5 ${
                    discussion.isLiked ? "fill-current" : ""
                  }`}
                />
                <span className="font-medium">{discussion.likes} likes</span>
              </Button>
              <div className="flex items-center space-x-2 text-gray-400">
                <MessageCircle className="h-5 w-5" />
                <span className="font-medium">{comments.length} comments</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="bg-gray-800 mb-8" />

        {/* Comments Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Discussion ({comments.length})
            </h2>
          </div>

          {/* Add Comment Form */}
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    U
                  </div>
                </div>
                <div className="flex-1">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts, ask questions, or provide additional insights..."
                    className="bg-gray-800 border-gray-700 text-white mb-4"
                    rows={4}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={() => onAddComment(discussion.id)}
                      disabled={!newComment.trim()}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Add Comment
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments List */}
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                No comments yet
              </h3>
              <p className="text-gray-400">
                Be the first to share your thoughts on this approach!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  discussionId={discussion.id}
                  onReplyToComment={onReplyToComment}
                  replyingToComment={replyingToComment}
                  setReplyingToComment={setReplyingToComment}
                  onLike={onLike}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
