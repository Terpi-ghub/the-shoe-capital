import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Link from "next/link";
import ArticleInteractions from "@/components/ArticleInteractions";
import ImageCarousel from "@/components/ImageCarousel";

export const revalidate = 0;

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    excerpt,
    "authorName": author->name,
    "authorSlug": author->slug.current,
    "authorImage": author->image,
    "artistName": artist->name,
    "artistSlug": artist->slug.current,
    "artistImage": artist->image,
    category,
    publishedAt,
    body,
    mainImage,
    images,
    likes,
    "comments": *[_type == "comment" && post._ref == ^._id && approved == true] | order(_createdAt desc)
  }`, { slug });

  if (!post) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-bold text-[#800000] mb-6">Article not found!</h1>
        <Link href="/" className="text-white bg-[#800000] hover:bg-[#FFD700] hover:text-[#800000] transition font-bold uppercase tracking-widest py-3 px-6 rounded-full shadow-lg">← Return to Homepage</Link>
      </main>
    );
  }

  const recommended = await client.fetch(`*[_type == "post" && _id != $postId] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "authorName": author->name,
    "slug": slug.current,
    mainImage,
    category
  }`, { postId: post._id });

  // 1. COMBINE IMAGES: Main cover image comes first, followed by additional images!
  const coverImages = [];
  if (post.mainImage) {
    coverImages.push(post.mainImage);
  }
  if (post.images && post.images.length > 0) {
    coverImages.push(...post.images);
  }

  // 2. ENCODE URLS: Makes social sharing actually embed the link/title properly
  const siteUrl = `https://theshoecapital.com/post/${slug}`;
  const encodedUrl = encodeURIComponent(siteUrl);
  const encodedTitle = encodeURIComponent(post.title || "Read this article");

  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-24">
      <article className="max-w-4xl mx-auto p-8 mt-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <Link href="/" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-[#800000] hover:text-[#FFD700] transition mb-8">
          ← Back to Homepage
        </Link>

        <header className="mb-10 border-b-2 border-gray-100 pb-8 relative">
          {post.category && (
            <Link href={`/category/${post.category.toLowerCase()}`} className="inline-block bg-[#FFD700] text-[#800000] text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full mb-6 hover:bg-[#800000] hover:text-[#FFD700] transition shadow-sm">
              {post.category}
            </Link>
          )}

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg md:text-xl text-gray-600 font-medium italic mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* AUTHOR & GRAPHICS SEPARATE PROFILE SECTION */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pt-4">
            
            <div className="flex flex-wrap items-center gap-6">
              {/* Writer Profile */}
              <div className="flex items-center gap-3">
                {post.authorImage ? (
                  <img
                    src={urlFor(post.authorImage).width(56).height(56).url()}
                    alt={post.authorName || "Writer"}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#FFD700] shadow-md"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#800000] text-[#FFD700] flex items-center justify-center font-bold text-base border-2 border-[#FFD700] shadow-md">
                    {(post.authorName || "E")[0]}
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                    <svg width="12" height="12" fill="none" stroke="#800000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                      <path d="M15 5l4 4" />
                    </svg>
                    Writer
                  </span>
                  {post.authorSlug ? (
                    <Link href={`/author/${post.authorSlug}`} className="font-bold text-[#800000] hover:text-[#FFD700] transition text-sm uppercase tracking-wide">
                      {post.authorName}
                    </Link>
                  ) : (
                    <span className="font-bold text-[#800000] text-sm uppercase tracking-wide">
                      {post.authorName || "Editorial Staff"}
                    </span>
                  )}
                </div>
              </div>

              {/* Graphics Profile (Now properly labeled as GRAPHICS) */}
              {post.artistName && (
                <div className="flex items-center gap-3 border-l-2 border-gray-200 pl-6">
                  {post.artistImage ? (
                    <img
                      src={urlFor(post.artistImage).width(56).height(56).url()}
                      alt={post.artistName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#800000] shadow-md"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-[#FFD700] text-[#800000] flex items-center justify-center font-bold text-base border-2 border-[#800000] shadow-md">
                      {post.artistName[0]}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                      <svg width="12" height="12" fill="none" stroke="#800000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M12 19l7-7 3 3-7 7-3-3z"/>
                        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
                        <path d="M2 2l7.586 7.586"/>
                        <circle cx="11" cy="11" r="2"/>
                      </svg>
                      Graphics
                    </span>
                    {post.artistSlug ? (
                      <Link href={`/author/${post.artistSlug}`} className="font-bold text-[#800000] hover:text-[#FFD700] transition text-sm uppercase tracking-wide">
                        {post.artistName}
                      </Link>
                    ) : (
                      <span className="font-bold text-[#800000] text-sm uppercase tracking-wide">
                        {post.artistName}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Date & Social Share */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
              <div className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                {post.publishedAt && new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>

              {/* Working social links using encodedUrl */}
              <div className="flex gap-2">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] text-white p-2 rounded-full hover:scale-110 transition shadow-md" aria-label="Share on Facebook">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                </a>
                <a href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`} target="_blank" rel="noopener noreferrer" className="bg-black text-white p-2 rounded-full hover:scale-110 transition shadow-md" aria-label="Share on X">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href={`mailto:?subject=${encodedTitle}&body=Read this article: ${encodedUrl}`} className="bg-gray-500 text-white p-2 rounded-full hover:scale-110 transition shadow-md" aria-label="Share via Email">
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                </a>
              </div>
            </div>

          </div>
        </header>

        {/* Carousel automatically supports mainImage + all additional images */}
        <ImageCarousel images={coverImages} alt={""} />

        {/* ADDED PARAGRAPH SPACING: prose-p:mb-8 and [&>p]:mb-8 force bottom margins */}
        <div className="prose prose-lg md:prose-xl prose-p:mb-8 [&>p]:mb-8 prose-p:leading-relaxed prose-a:text-[#800000] hover:prose-a:text-[#FFD700] prose-headings:font-bold prose-headings:text-[#800000] mx-auto text-gray-800 leading-relaxed mb-10 prose-img:rounded-xl prose-img:shadow-lg">
          {post.body ? <PortableText value={post.body} /> : <p>Start writing your story...</p>}
        </div>

        <ArticleInteractions
          postId={post._id}
          likedBy={post.likedBy || []}
          comments={post.comments || []}
        />
      </article>

      {recommended.length > 0 && (
        <section className="max-w-6xl mx-auto p-8 mt-12">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-bold text-[#800000] uppercase tracking-wide">Recommended Reading</h2>
            <div className="flex-1 h-1 bg-gradient-to-r from-[#800000] to-transparent"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {recommended.map((rec: any) => (
              <Link key={rec._id} href={rec.slug ? `/post/${rec.slug}` : "/"} className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition duration-500 overflow-hidden flex flex-col border border-gray-100 transform hover:-translate-y-1">
                {rec.mainImage && (
                  <div className="h-48 overflow-hidden relative">
                    <img src={urlFor(rec.mainImage).width(600).height(400).url()} alt={rec.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500"></div>
                  </div>
                )}
                <div className="p-6 flex flex-col flex-grow">
                  {rec.category && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#800000] mb-2 bg-[#FFD700]/20 inline-block px-2 py-1 rounded-sm self-start">{rec.category}</span>
                  )}
                  <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#800000] transition mb-4 line-clamp-2">{rec.title}</h4>
                  <div className="mt-auto flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-widest pt-4 border-t border-gray-50">
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="M15 5l4 4" /></svg>
                    {rec.authorName || "Editorial Staff"}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}