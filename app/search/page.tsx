import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || "";
  const posts = await client.fetch(`*[_type == "post" && (title match $searchQuery || excerpt match $searchQuery)] | order(publishedAt desc) {
    _id,
    title,
    "authorName": author->name,
    "authorSlug": author->slug.current,
    category,
    excerpt,
    "slug": slug.current,
    mainImage
  }`, { searchQuery: `${query}*` });
  return (
    <main className="min-h-screen bg-white font-sans">
      <div className="max-w-6xl mx-auto p-8 py-12">
        <h1 className="text-3xl font-bold text-[#800000] border-b-2 border-[#FFD700] pb-2 mb-8">
          Search Results for: <span className="text-gray-900">"{query}"</span>
        </h1>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-lg">No articles found matching your search.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <article key={post._id} className="group relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition duration-300 h-full flex flex-col overflow-hidden">
                <Link href={post.slug ? `/post/${post.slug}` : "/"} className="absolute inset-0 z-10"><span className="sr-only">Read {post.title}</span></Link>
                {post.mainImage && (
                  <div className="overflow-hidden h-48 relative z-0">
                    <img src={urlFor(post.mainImage).width(600).height(400).url()} alt={post.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-grow pointer-events-none z-20">
                  {post.category && (
                    <div className="mb-2">
                      <Link href={`/category/${post.category.toLowerCase()}`} className="pointer-events-auto text-xs font-bold uppercase tracking-wider text-[#800000] hover:underline relative z-30">
                        {post.category}
                      </Link>
                    </div>
                  )}
                  <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#800000] transition">
                    {post.title}
                  </h4>
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto pointer-events-auto relative z-30">
                    <p className="text-gray-400 text-xs font-medium uppercase tracking-wide">
                      By {post.authorSlug ? (
                        <Link href={`/author/${post.authorSlug}`} className="hover:text-[#800000] transition">
                          {post.authorName}
                        </Link>
                      ) : (
                        <span>{post.authorName || "Staff Writer"}</span>
                      )}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}