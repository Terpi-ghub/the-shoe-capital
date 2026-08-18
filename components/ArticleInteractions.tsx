"use client";
import { useState, useEffect } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";

export default function ArticleInteractions({ postId, comments = [], likedBy = [] }: { postId: string, comments?: any[], likedBy?: string[] }) {
  const { isSignedIn, user, isLoaded } = useUser();
  
  // Total likes is now just the length of the list of IDs
  const [likesCount, setLikesCount] = useState(likedBy.length);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // When the user logs in, check if their ID is already on the database's list
  useEffect(() => {
    if (isLoaded && user) {
      setIsLiked(likedBy.includes(user.id));
    }
  }, [isLoaded, user, likedBy]);

  const handleLike = async () => {
    if (!isSignedIn || !user) {
      alert("Please log in to like this article!");
      return;
    }

    const newAction = isLiked ? "unlike" : "like";
    
    // Instantly update the UI
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
    setIsLiked(!isLiked);

    // Send the user's specific ID to our new API route
    await fetch("/api/like", {
      method: "POST",
      body: JSON.stringify({
        postId: postId,
        action: newAction,
        userId: user.id, // <--- We are now passing the Clerk ID!
      }),
    });
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;
    
    await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        name: user?.fullName || "Anonymous Student",
        email: user?.primaryEmailAddress?.emailAddress,
        comment: commentText,
        postId: postId,
      }),
    });
    
    setSubmitted(true);
    setCommentText("");
  };

  return (
    <div className="border-t-2 border-gray-100 pt-8 mt-12">
      {/* Like Button */}
      <div className="flex items-center gap-4 mb-12">
        <button onClick={handleLike} className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition shadow-md ${isLiked ? 'bg-[#800000] text-[#FFD700] scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <svg width="20" height="20" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
        </button>
      </div>

      <h3 className="text-2xl font-bold text-[#800000] mb-6 flex items-center gap-2">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        Discussion
      </h3>

      {comments.length > 0 && (
        <div className="mb-8 space-y-4">
          {comments.map((c: any) => (
            <div key={c._id || Math.random()} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="font-bold text-sm text-[#800000] mb-1">{c.name}</p>
              <p className="text-gray-700">{c.comment}</p>
            </div>
          ))}
        </div>
      )}

      {isSignedIn ? (
        <form onSubmit={handleCommentSubmit} className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm relative">
          <div className="flex items-center gap-3 mb-4">
            <img src={user?.imageUrl} alt={user?.fullName || "User"} className="w-10 h-10 rounded-full object-cover border border-[#800000]" />
            <div>
              <p className="font-bold text-gray-900 text-sm">{user?.fullName || user?.primaryEmailAddress?.emailAddress}</p>
              <p className="text-xs text-gray-500">Posting publicly</p>
            </div>
          </div>
          {submitted ? (
            <div className="bg-green-50 text-green-800 p-4 rounded-lg font-medium text-sm">
              Thank you! Your comment has been submitted for review.
            </div>
          ) : (
            <>
              <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write your thoughts here..." rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#800000] outline-none transition mb-4 resize-none" required></textarea>
              <button type="submit" className="bg-[#800000] text-white font-bold uppercase tracking-widest py-3 px-8 rounded-lg hover:bg-[#FFD700] transition shadow-md w-full md:w-auto">Post Comment</button>
            </>
          )}
        </form>
      ) : (
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm text-center">
          <h4 className="text-xl font-bold text-gray-900 mb-2">Join the Conversation</h4>
          <p className="text-gray-500 mb-6">You must be logged in to leave a comment.</p>
          <SignInButton mode="modal">
            <button className="bg-[#800000] text-white font-bold uppercase tracking-widest py-3 px-8 rounded-full hover:bg-[#FFD700] transition shadow-lg">Log In</button>
          </SignInButton>
        </div>
      )}
    </div>
  );
}