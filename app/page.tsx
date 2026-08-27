import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

export const revalidate = 0;

// Signature "SEE LATEST --------" Header Style
const SectionHeader = ({ title }: { title: string }) => (
  <div className="flex items-center gap-4 mb-6">
    <h2 className="text-2xl md:text-3xl font-black text-[#800000] tracking-wide uppercase">
      {title}
    </h2>
    <div className="flex-grow h-0.5 bg-[#800000]"></div>
  </div>
);

// Signature Author Pencil Icon
const AuthorPencil = ({ name }: { name: string }) => (
  <div className="flex items-center gap-1.5 text-[#FFD700] text-[9px] md:text-[10px] font-black uppercase tracking-wider mt-2 z-10 relative">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
    </svg>
    {name || "Staff Writer"}
  </div>
);

// Standard Category Block (Features, Sci-Tech, Sports) - Updated to square aspect ratio
const CategoryBlock = ({ title, posts }: { title: string; posts: any[] }) => {
  if (!posts || posts.length === 0) return null;
  const leadPost = posts[0];
  const secondaryPosts = posts.slice(1, 4);

  return (
    <div className="flex flex-col">
      <SectionHeader title={title} />
      
      {/* Lead Story - Square Ratio */}
      <Link href={`/post/${leadPost.slug.current}`} className="relative group overflow-hidden rounded-3xl shadow-lg aspect-square mb-5 block bg-gray-100">
        {leadPost.mainImage && (
          <img src={urlFor(leadPost.mainImage).url()} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={leadPost.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#800000] via-[#800000]/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-5 w-full">
          <h3 className="text-xl font-bold text-white leading-tight mb-1">{leadPost.title}</h3>
          <AuthorPencil name={leadPost.authorName} />
        </div>
      </Link>

      {/* Secondary Stories - Square Thumbnails */}
      <div className="flex flex-col gap-4">
        {secondaryPosts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`} className="flex gap-4 group items-center bg-[#F9F9F9] p-2 rounded-2xl border border-transparent hover:border-gray-200 transition">
            <div className="w-20 h-20 shrink-0 overflow-hidden rounded-xl shadow-sm relative bg-gray-200">
              {post.mainImage && (
                <img src={urlFor(post.mainImage).url()} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" alt={post.title} />
              )}
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#800000] transition leading-snug line-clamp-2">
                {post.title}
              </h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">By {post.authorName || "Staff"}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default async function HomePage() {
  const data = await client.fetch(`{
    "hero": *[_type == "post"] | order(publishedAt desc)[0...3] { _id, title, slug, mainImage, publishedAt, category, excerpt, "authorName": author->name },
    "news": *[_type == "post" && category == "News"] | order(publishedAt desc)[0...4] { _id, title, slug, mainImage, publishedAt, category, "authorName": author->name },
    "editorial": *[_type == "post" && category == "Editorial"] | order(publishedAt desc)[0...4] { _id, title, slug, mainImage, publishedAt, excerpt, category, "authorName": author->name },
    "updates": *[_type == "post" && category == "Updates"] | order(publishedAt desc)[0...4] { _id, title, slug, mainImage, publishedAt, category, "authorName": author->name },
    "trending": *[_type == "post"] | order(likes desc)[0...5] { _id, title, slug, publishedAt, "authorName": author->name },
    "graphics": *[_type == "post" && category == "Graphics"] | order(publishedAt desc)[0...4] { _id, title, slug, mainImage, publishedAt, category },
    "features": *[_type == "post" && category == "Feature"] | order(publishedAt desc)[0...4] { _id, title, slug, mainImage, publishedAt, category, "authorName": author->name },
    "scitech": *[_type == "post" && category == "Sci-Tech"] | order(publishedAt desc)[0...4] { _id, title, slug, mainImage, publishedAt, category, "authorName": author->name },
    "sports": *[_type == "post" && category == "Sports"] | order(publishedAt desc)[0...4] { _id, title, slug, mainImage, publishedAt, category, "authorName": author->name },
    "literary": *[_type == "post" && category == "Literary"] | order(publishedAt desc)[0...4] { _id, title, slug, mainImage, publishedAt, excerpt, category, "authorName": author->name },
    "column": *[_type == "post" && category == "Column"] | order(publishedAt desc)[0...4] { _id, title, slug, mainImage, publishedAt, category, "authorName": author->name }
  }`);

  const { hero, news, editorial, updates, trending, graphics, features, scitech, sports, literary, column } = data;

  return (
    <div className="bg-white min-h-screen w-full">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* --- 1. HERO SECTION (SEE LATEST) --- */}
        <SectionHeader title="SEE LATEST" />
        {hero && hero.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
            
            {/* Main Hero Card - Square Ratio */}
            <Link href={`/post/${hero[0]?.slug.current}`} className="lg:col-span-7 relative group overflow-hidden rounded-3xl shadow-xl aspect-square bg-gray-100">
              {hero[0]?.mainImage && (
                <img src={urlFor(hero[0].mainImage).url()} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Hero" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#800000] via-[#800000]/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <span className="bg-[#FFD700] text-[#800000] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 mb-3 inline-block rounded-full">
                  {hero[0]?.category || "Latest"}
                </span>
                <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2 group-hover:text-gray-200 transition">{hero[0]?.title}</h1>
                {hero[0]?.excerpt && <p className="text-white/90 text-sm mb-2 line-clamp-2">{hero[0].excerpt}</p>}
                <AuthorPencil name={hero[0]?.authorName} />
              </div>
            </Link>

            {/* Secondary Hero Cards */}
            <div className="lg:col-span-5 grid grid-rows-2 gap-6">
              {[hero[1], hero[2]].map((post) => (
                post && (
                  <Link key={post._id} href={`/post/${post.slug.current}`} className="relative group overflow-hidden rounded-3xl shadow-xl aspect-[16/9] lg:aspect-auto bg-gray-100">
                    {post.mainImage && (
                      <img src={urlFor(post.mainImage).url()} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Secondary" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#800000] via-[#800000]/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <span className="bg-[#FFD700] text-[#800000] text-[9px] font-black uppercase tracking-widest px-3 py-1 mb-2 inline-block rounded-full">
                        {post.category || "Updates"}
                      </span>
                      <h2 className="text-xl font-bold text-white leading-tight">{post.title}</h2>
                      <AuthorPencil name={post.authorName} />
                    </div>
                  </Link>
                )
              ))}
            </div>
          </div>
        )}

        {/* --- 2. EXPLORE SECTION --- */}
        <SectionHeader title="Explore Our Website!" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <Link href="/about" className="aspect-[3/4] rounded-3xl shadow-xl overflow-hidden group relative block">
              <img src="/explore-about.gif" alt="About" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </Link>
          <Link href="/staff" className="aspect-[3/4] rounded-3xl shadow-xl overflow-hidden group relative block">
               <img src="/explore-board.gif" alt="Editorial Board" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </Link>
          <Link href="/category/updates" className="aspect-[3/4] rounded-3xl shadow-xl overflow-hidden group relative block">
              <img src="/explore-updates.gif" alt="Updates" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </Link>
        </div>

        {/* --- 3. MAIN SPLIT: NEWS/EDITORIAL vs TRENDING/UPDATES --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 mb-16">
          <div className="lg:col-span-8 flex flex-col gap-12">
            <div>
              <SectionHeader title="Top News" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news?.map((post: any) => (
                  <Link key={post._id} href={`/post/${post.slug.current}`} className="relative group overflow-hidden rounded-3xl shadow-lg aspect-square bg-gray-100">
                    {post.mainImage && (
                      <img src={urlFor(post.mainImage).url()} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="News" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#800000] via-[#800000]/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                      <h2 className="text-xl font-bold text-white leading-tight">{post.title}</h2>
                      <AuthorPencil name={post.authorName} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {editorial?.[0] && (
              <div>
                <SectionHeader title="Editorial Spotlight" />
                <Link href={`/post/${editorial[0].slug.current}`} className="relative group overflow-hidden rounded-3xl shadow-xl aspect-[4/5] md:aspect-[4/3] block bg-gray-100 max-w-xl mx-auto w-full">
                  {editorial[0].mainImage && (
                    <img src={urlFor(editorial[0].mainImage).url()} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Editorial" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#800000] via-[#800000]/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full text-center flex flex-col items-center">
                    <span className="bg-[#FFD700] text-[#800000] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 mb-3 inline-block rounded-full">Editorial</span>
                    <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">{editorial[0].title}</h2>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-12">
            <div>
              <SectionHeader title="Trending" />
              <div className="bg-[#F9F9F9] border border-gray-200 rounded-3xl shadow-sm p-6 flex flex-col gap-6">
                {trending?.map((post: any, index: number) => (
                  <Link key={post._id} href={`/post/${post.slug.current}`} className="flex gap-4 group items-center">
                    <span className="text-5xl font-black text-[#800000]/10 group-hover:text-[#FFD700] transition w-10 text-center shrink-0">{index + 1}</span>
                    <div>
                      <h4 className="text-base font-bold text-gray-900 group-hover:text-[#800000] transition leading-snug">{post.title}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">By {post.authorName || "Staff"}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="sticky top-8">
              <SectionHeader title="Updates" />
              <div className="bg-[#F9F9F9] border border-gray-200 rounded-3xl shadow-sm p-6 flex flex-col gap-4">
                {updates?.map((post: any) => (
                  <Link key={post._id} href={`/post/${post.slug.current}`} className="flex gap-4 group items-center border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                    <div className="w-16 h-16 shrink-0 overflow-hidden rounded-xl shadow-sm relative bg-gray-200">
                      {post.mainImage && (
                        <img src={urlFor(post.mainImage).url()} className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" alt="Update" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#800000] transition leading-snug line-clamp-2">{post.title}</h4>
                      <p className="text-[10px] text-gray-500 font-bold uppercase mt-1">By {post.authorName || "Staff"}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* --- 4. GRAPHICS (Square Gallery Layout) --- */}
        {graphics && graphics.length > 0 && (
          <div className="mb-16">
            <SectionHeader title="Graphics" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {graphics.map((post: any) => (
                <Link key={post._id} href={`/post/${post.slug.current}`} className="relative group overflow-hidden rounded-3xl shadow-md aspect-square bg-gray-100">
                  {post.mainImage && (
                    <img src={urlFor(post.mainImage).url()} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Graphic" />
                  )}
                  <div className="absolute inset-0 bg-[#800000]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center">
                    <h3 className="text-white font-bold text-sm md:text-base">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* --- 5. DEPARTMENT GRIDS (Features, Sci-Tech, Sports) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 pt-8 border-t-2 border-gray-100">
          <CategoryBlock title="Features" posts={features} />
          <CategoryBlock title="Sci-Tech" posts={scitech} />
          <CategoryBlock title="Sports" posts={sports} />
        </div>

        {/* --- 6. BOTTOM SPLIT: LITERARY vs COLUMN --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 pt-12 border-t-2 border-gray-100">
          
          <div className="lg:col-span-8">
            <SectionHeader title="Literary" />
            <div className="flex flex-col gap-6">
              {literary?.map((post: any) => (
                <Link key={post._id} href={`/post/${post.slug.current}`} className="flex flex-col md:flex-row gap-6 bg-[#F9F9F9] p-6 rounded-3xl group border border-transparent hover:border-gray-200 transition">
                  <div className="w-full md:w-48 h-48 shrink-0 overflow-hidden rounded-2xl shadow-sm relative bg-gray-200">
                    {post.mainImage && (
                      <img src={urlFor(post.mainImage).url()} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Literary" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-[#800000] transition leading-tight mb-2">{post.title}</h3>
                    <AuthorPencil name={post.authorName} />
                    {post.excerpt && <p className="text-gray-600 mt-4 text-sm leading-relaxed line-clamp-3 italic">"{post.excerpt}"</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <SectionHeader title="Columns" />
            <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-6 flex flex-col gap-6">
              {column?.map((post: any) => (
                <Link key={post._id} href={`/post/${post.slug.current}`} className="flex gap-5 group items-center border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                  <div className="w-16 h-16 shrink-0 overflow-hidden rounded-full shadow-md relative bg-gray-100 border-2 border-[#FFD700] group-hover:border-[#800000] transition-colors">
                    {post.mainImage && (
                      <img src={urlFor(post.mainImage).url()} className="absolute inset-0 w-full h-full object-cover" alt="Columnist" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-[11px] font-black text-[#800000] uppercase tracking-widest mb-1">{post.authorName || "Guest Columnist"}</h4>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#800000] transition leading-snug line-clamp-2">{post.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
          
        </div>

      </main>
    </div>
  );
}