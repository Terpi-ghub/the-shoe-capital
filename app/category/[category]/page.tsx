import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import CategorySorter from "@/components/CategorySorter";
export default async function CategoryPage({ params, searchParams }: { params: Promise<{ category: string }>, searchParams: Promise<{ sort?: string }> }) {
  const { category } = await params;
  const resolvedParams = await searchParams;
  const sort = resolvedParams.sort || "latest";
  let orderQuery = "publishedAt desc";
  if (sort === "oldest") orderQuery = "publishedAt asc";
  if (sort === "hot" || sort === "popular") orderQuery = "_createdAt desc";
  const posts = await client.fetch(`*[_type == "post" && category match $category] | order(${orderQuery}) {
    _id,
    title,
    "authorName": author->name,
    category,
    excerpt,
    publishedAt,
    "slug": slug.current,
    mainImage
  }`, { category });
  const displayCategory = category.charAt(0).toUpperCase() + category.slice(1);
  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-6xl mx-auto p-8 mt-4 md:mt-8">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-[#800000] border-b-4 border-[#FFD700] pb-4 mb-6 tracking-tight">
            {displayCategory}
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <p className="text-gray-500 text-lg uppercase tracking-wide font-medium">
              Browse all published stories in this section.
            </p>
            <CategorySorter />
          </div>
        </header>
        {posts.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-white shadow-sm">
            <p className="text-gray-500 text-xl font-bold">No articles found in this category yet.</p>
            <Link href="/" className="inline-block mt-4 text-[#800000] hover:text-[#FFD700] font-bold uppercase tracking-wider transition">
              ← Return Home
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <Link key={post._id} href={post.slug ? `/post/${post.slug}` : "/"} className="group bg-white rounded-xl hover:shadow-2xl transition duration-500 h-full flex flex-col overflow-hidden border border-gray-100 transform hover:-translate-y-1">
                {post.mainImage && (
                  <div className="overflow-hidden h-52 relative">
                    <img src={urlFor(post.mainImage).width(600).height(400).url()} alt={post.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500"></div>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#800000] mb-3 bg-[#FFD700]/20 inline-block px-2 py-1 rounded-sm self-start">
                    {post.category || "Update"}
                  </span>
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#800000] transition line-clamp-2">
                    {post.title}
                  </h4>
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      <svg width="12" height="12" fill="none" stroke="#800000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="M15 5l4 4"/></svg>
                      {post.authorName || "Editorial Staff"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}