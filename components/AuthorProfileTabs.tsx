"use client";

import { useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage?: any;
  category?: string;
  publishedAt?: string;
  excerpt?: string;
}

interface AuthorProfileTabsProps {
  writtenPosts: Post[];
  graphicsPosts: Post[];
}

export default function AuthorProfileTabs({ writtenPosts, graphicsPosts }: AuthorProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<"written" | "graphics">("written");

  const currentPosts = activeTab === "written" ? writtenPosts : graphicsPosts;

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex border-b-2 border-gray-200 mb-8 gap-4">
        <button
          onClick={() => setActiveTab("written")}
          className={`pb-4 px-4 text-sm font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 ${
            activeTab === "written"
              ? "text-[#800000] border-b-4 border-[#800000] -mb-[2px]"
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
            <path d="M15 5l4 4" />
          </svg>
          Written Articles
          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full font-semibold">
            {writtenPosts.length}
          </span>
        </button>

        {/* Graphics Tab (only visible or highlighted if they have graphics posts) */}
        <button
          onClick={() => setActiveTab("graphics")}
          className={`pb-4 px-4 text-sm font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 ${
            activeTab === "graphics"
              ? "text-[#800000] border-b-4 border-[#800000] -mb-[2px]"
              : "text-gray-400 hover:text-gray-700"
          }`}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M12 19l7-7 3 3-7 7-3-3z"/>
            <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
            <path d="M2 2l7.586 7.586"/>
            <circle cx="11" cy="11" r="2"/>
          </svg>
          Graphics Work
          <span className="bg-[#FFD700]/30 text-[#800000] text-xs px-2 py-0.5 rounded-full font-semibold">
            {graphicsPosts.length}
          </span>
        </button>
      </div>

      {/* Post Grid */}
      {currentPosts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <Link
              key={post._id}
              href={post.slug ? `/post/${post.slug}` : "/"}
              className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-500 overflow-hidden flex flex-col border border-gray-100 transform hover:-translate-y-1"
            >
              {post.mainImage && (
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={urlFor(post.mainImage).width(600).height(400).url()}
                    alt={post.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500"></div>
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                {post.category && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#800000] mb-2 bg-[#FFD700]/20 inline-block px-2 py-1 rounded-sm self-start">
                    {post.category}
                  </span>
                )}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#800000] transition mb-3 line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                )}
                <div className="mt-auto pt-4 border-t border-gray-50 text-xs text-gray-400 font-semibold uppercase">
                  {post.publishedAt &&
                    new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-inner">
          <p className="text-gray-500 font-medium text-lg">
            No {activeTab === "written" ? "written articles" : "graphics work"} found for this author.
          </p>
        </div>
      )}
    </div>
  );
}