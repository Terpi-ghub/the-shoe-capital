import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Link from "next/link";
import AuthorProfileTabs from "@/components/AuthorProfileTabs";

export const revalidate = 0;

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  // 1. Fetch Author Profile with flexible category resolution
  const author = await client.fetch(
    `*[_type == "author" && slug.current == $slug][0] {
      _id,
      name,
      role,
      position,
      bio,
      image,
      category,
      "categoryTitle": category->title,
      "categoryName": category->name,
      categories
    }`,
    { slug }
  );

  if (!author) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold text-[#800000] mb-6">Author Not Found</h1>
        <Link
          href="/"
          className="text-white bg-[#800000] hover:bg-[#FFD700] hover:text-[#800000] transition font-bold uppercase tracking-widest py-3 px-6 rounded-full shadow-lg"
        >
          ← Return to Homepage
        </Link>
      </main>
    );
  }

  // 2. Fetch posts written by this author
  const writtenPosts = await client.fetch(
    `*[_type == "post" && author._ref == $authorId] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      category,
      publishedAt,
      excerpt
    }`,
    { authorId: author._id }
  );

  // 3. Fetch posts where this author is credited for graphics
  const graphicsPosts = await client.fetch(
    `*[_type == "post" && artist._ref == $authorId] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      category,
      publishedAt,
      excerpt
    }`,
    { authorId: author._id }
  );

  // Staff Role resolution
  const staffRole = author.role || author.position || "Editorial Staff";

  // Category resolution (supports plain string, reference, or array)
  const categoryLabel = 
    author.categoryTitle || 
    author.categoryName || 
    (typeof author.category === "string" ? author.category : null) ||
    (Array.isArray(author.categories) ? author.categories.join(", ") : null);

  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-24">
      <div className="max-w-6xl mx-auto p-8 mt-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#800000] hover:text-[#FFD700] transition mb-8"
        >
          ← Back to Homepage
        </Link>

        {/* Author Bio & Role Header Card */}
        <header className="bg-white rounded-2xl p-8 mb-12 shadow-xl border border-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {author.image ? (
            <img
              src={urlFor(author.image).width(160).height(160).url()}
              alt={author.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-[#FFD700] shadow-lg flex-shrink-0"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-[#800000] text-[#FFD700] flex items-center justify-center font-bold text-4xl border-4 border-[#FFD700] shadow-lg flex-shrink-0">
              {author.name[0]}
            </div>
          )}

          <div className="text-center sm:text-left flex-grow">
            {/* BOTH STAFF ROLE & ASSIGNED CATEGORY SHOW SIDE-BY-SIDE */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
              {/* Staff Role Badge */}
              <span className="bg-[#800000] text-[#FFD700] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]"></span>
                {staffRole}
              </span>

              {/* Assigned Category Badge */}
              {categoryLabel && (
                <span className="bg-[#FFD700] text-[#800000] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm border border-[#800000]/10">
                  {categoryLabel}
                </span>
              )}
            </div>

            {/* Author Name */}
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              {author.name}
            </h1>

            {/* Bio Section */}
            {author.bio ? (
              <div className="text-gray-600 leading-relaxed max-w-2xl text-base md:text-lg prose prose-sm">
                {Array.isArray(author.bio) ? (
                  <PortableText value={author.bio} />
                ) : (
                  <p>{author.bio}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-400 italic text-sm">
                Contributor and staff member at The Shoe Capital.
              </p>
            )}
          </div>
        </header>

        {/* Tabs for Written Articles vs Graphics Work */}
        <AuthorProfileTabs writtenPosts={writtenPosts} graphicsPosts={graphicsPosts} />
      </div>
    </main>
  );
}