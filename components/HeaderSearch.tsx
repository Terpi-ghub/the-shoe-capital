"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
export default function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (query.length > 1) {
      const fetchResults = async () => {
        const posts = await client.fetch(`*[_type == "post" && (title match $searchQuery || excerpt match $searchQuery)][0...5] {
          _id,
          title,
          category,
          excerpt,
          mainImage,
          "slug": slug.current
        }`, { searchQuery: `${query}*` });
        setResults(posts);
      };
      fetchResults();
    } else {
      setResults([]);
    }
  }, [query]);
  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-white hover:text-gray-200 transition flex items-center justify-center p-2">
        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
      </button>
      {isOpen && mounted && createPortal(
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-start justify-center pt-24 px-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-2xl relative my-8">
            <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-black font-bold text-xl">✕</button>
            <input type="text" placeholder="Search articles..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full text-2xl font-serif text-black border-b-2 border-[#800000] pb-2 outline-none mb-6 mt-4 placeholder-gray-300" autoFocus />
            {results.length > 0 && (
              <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
                {results.map((post: any) => (
                  <Link key={post._id} href={`/post/${post.slug}`} onClick={() => setIsOpen(false)} className="flex gap-4 p-4 border border-gray-100 rounded-lg hover:border-[#FFD700] hover:bg-gray-50 transition">
                    {post.mainImage && (
                      <img src={urlFor(post.mainImage).width(160).height(160).url()} alt={post.title} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-md flex-shrink-0" />
                    )}
                    <div className="flex flex-col justify-center">
                      <span className="text-xs font-bold text-[#800000] uppercase tracking-wider mb-1 block">{post.category}</span>
                      <h4 className="text-lg font-serif font-bold text-gray-900 mb-1">{post.title}</h4>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm line-clamp-2">{post.excerpt}</p>
                      )}
                    </div>
                  </Link>
                ))}
                <Link href={`/search?q=${query}`} onClick={() => setIsOpen(false)} className="text-center text-[#800000] font-bold mt-4 hover:underline uppercase tracking-widest text-sm py-2 block">
                  View all results →
                </Link>
              </div>
            )}
            {query.length > 1 && results.length === 0 && (
              <p className="text-gray-500 text-center py-8">No recommendations found.</p>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}