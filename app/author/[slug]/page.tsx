import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Link from "next/link";
export const revalidate = 0;
export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const author = await client.fetch(`*[_type == "author" && slug.current == $slug][0] {
    name,
    image,
    bio,
    position,
    categories
  }`, { slug });
  const posts = await client.fetch(`*[_type == "post" && author->slug.current == $slug] | order(publishedAt desc) {
    _id,
    title,
    category,
    excerpt,
    "slug": slug.current,
    mainImage
  }`, { slug });
  if (!author) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-3xl font-bold text-[#800000] mb-4">Author Profile not found!</h1>
        <Link href="/" className="text-black hover:text-[#800000] underline font-medium">← Return to Homepage</Link>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-white font-sans">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto p-8 py-12 flex flex-col md:flex-row items-center md:items-start gap-8">
          {author.image && (
            <img src={urlFor(author.image).width(200).height(200).url()} alt={author.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-[#FFD700]" />
          )}
          <div className="text-center md:text-left flex-1 py-2">
            <h1 className="text-4xl md:text-5xl font-bold text-[#800000] mb-2">
              {author.name}
            </h1>
            {author.position && (
              <p className="inline-block bg-[#800000] text-[#FFD700] text-sm font-bold uppercase tracking-widest py-1 px-3 rounded mb-4">
                {author.position}
              </p>
            )}
            {author.categories && author.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                {author.categories.map((cat: string) => (
                  <span key={cat} className="bg-white border border-[#FFD700] text-[#800000] text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full shadow-sm">
                    {cat}
                  </span>
                ))}
              </div>
            )}
            <div className="prose prose-lg text-gray-700 max-w-none">
              {author.bio ? <PortableText value={author.bio} /> : <p>Staff writer for The Shoe Capital.</p>}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-8 py-12">
        <h2 className="text-2xl font-bold text-[#800000] border-b-2 border-[#FFD700] pb-2 mb-8 uppercase tracking-wide">
          Articles by {author.name}
        </h2>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-lg">No articles published by this author yet.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post: any) => (
              <article key={post._id} className="group relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl transition duration-300 h-full flex flex-col overflow-hidden">
                <Link href={post.slug ? `/post/${post.slug}` : "/"} className="absolute inset-0 z-10"><span className="sr-only">Read {post.title}</span></Link>
                {post.mainImage && (
                  <div className="overflow-hidden h-52 relative z-0">
                    <img src={urlFor(post.mainImage).width(600).height(400).url()} alt={post.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow relative z-20 pointer-events-none">
                  {post.category && (
                    <Link href={`/category/${post.category.toLowerCase()}`} className="pointer-events-auto text-xs font-bold uppercase tracking-wider text-[#800000] mb-2 hover:underline inline-block self-start">
                      {post.category}
                    </Link>
                  )}
                  <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#800000] transition">
                    {post.title}
                  </h4>
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}