import { Loader2, MessageCircle, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

// Discussion Panel Component
export const DiscussionPanel = () => {
  const [discussions, setDiscussions] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    // Fetch discussions data
    const fetchDiscussions = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const response = await fetch(`/api/discussions?sort=${sortBy}`);
        const data = await response.json();
        setDiscussions(data);
      } catch (error) {
        console.error("Failed to fetch discussions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscussions();
  }, [sortBy]);

  const handleSubmitComment = async (e: any) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // Replace with actual API call
      const response = await fetch("/api/discussions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newComment }),
      });
      const newDiscussion = await response.json();
      setDiscussions([newDiscussion, ...discussions]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="flex flex-col items-center">
          <Loader2 className="h-6 w-6 animate-spin text-blue-500 mb-2" />
          <p className="text-sm text-gray-600">Loading discussions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4 bg-black">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">Discussion</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 text-white"
          >
            <option value="newest" className="text-white">
              Newest
            </option>
            <option value="oldest" className="text-white">
              Oldest
            </option>
            <option value="most_liked" className="text-white">
              Most Liked
            </option>
          </select>
        </div>
        <p className="text-sm text-white/80">
          Share your thoughts and solutions with the community
        </p>
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts, ask questions, or help others..."
          className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 text-sm text-white"
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* Discussion List */}
      {discussions.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <MessageCircle className="h-12 w-12 mb-4" />
          <p className="text-lg font-medium">No discussions yet</p>
          <p className="text-sm">Be the first to start a discussion!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {discussions.map((discussion: any) => (
            <div
              key={discussion.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {discussion.author.username.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <p className="text-sm font-medium text-gray-900">
                      {discussion.author.username}
                    </p>
                    <span className="text-xs text-gray-500">
                      {new Date(discussion.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">
                    {discussion.content}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{discussion.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 hover:text-blue-600">
                      <MessageCircle className="h-3 w-3" />
                      <span>{discussion.replies?.length || 0} replies</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
