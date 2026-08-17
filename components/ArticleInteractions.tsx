"use client";
import { useState } from "react";
export default function ArticleInteractions() {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };
  return (
    <div className="border-t-2 border-gray-100 pt-8 mt-12">
      <div className="flex items-center gap-4 mb-12">
        <button onClick={handleLike} className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-sm transition shadow-md ${isLiked ? 'bg-[#800000] text-[#FFD700] scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
          <svg width="20" height="20" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          {likes} {likes === 1 ? 'Like' : 'Likes'}
        </button>
      </div>
      <h3 className="text-2xl font-bold text-[#800000] mb-6 flex items-center gap-2">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
        Discussion
      </h3>
      {isLoggedIn ? (
        <form className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm relative">
          <button type="button" onClick={() => setIsLoggedIn(false)} className="absolute top-4 right-4 text-xs font-bold text-gray-500 hover:text-[#800000] uppercase underline">Sign Out</button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#800000] rounded-full flex items-center justify-center text-[#FFD700] font-bold">U</div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Authenticated User</p>
              <p className="text-xs text-gray-500">Posting publicly</p>
            </div>
          </div>
          <textarea placeholder="Write your thoughts here..." rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#800000] focus:ring-2 focus:ring-[#800000]/20 outline-none transition mb-4 resize-none" required></textarea>
          <button type="submit" className="bg-[#800000] text-white font-bold uppercase tracking-widest py-3 px-8 rounded-lg hover:bg-[#FFD700] hover:text-[#800000] transition shadow-md w-full md:w-auto">Post Comment</button>
        </form>
      ) : (
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm text-center">
          <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" className="mx-auto mb-4 text-gray-400" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Join the Conversation</h4>
          <p className="text-gray-500 mb-6">You must be signed in to leave a comment or interact with this article.</p>
          <button onClick={() => setIsLoggedIn(true)} className="bg-[#800000] text-white font-bold uppercase tracking-widest py-3 px-8 rounded-full hover:bg-[#FFD700] hover:text-[#800000] transition shadow-lg">Sign In to Comment</button>
        </div>
      )}
    </div>
  );
}