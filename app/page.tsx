import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
export default async function HomePage() {
  const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "authorName": author->name,
    "authorSlug": author->slug.current,
    "artistName": artist->name,
    category,
    excerpt,
    publishedAt,
    "slug": slug.current,
    mainImage
  }`);
  const topPosts = posts.slice(0, 3);
  const categoriesList = [
    { title: "News", cat: "news" },
    { title: "Editorial", cat: "editorial" },
    { title: "Column", cat: "column" },
    { title: "Feature", cat: "feature" },
    { title: "Sci-Tech", cat: "sci-tech" },
    { title: "Sports", cat: "sports" },
    { title: "Literary", cat: "literary" },
    { title: "Graphics", cat: "graphics" },
    { title: "Updates", cat: "updates" }
  ];
  const categories = categoriesList.map(c => ({
    ...c,
    data: posts.filter((p: any) => p.category?.toLowerCase() === c.cat).slice(0, 3)
  }));
  return (
    <main className="min-h-screen bg-gray-50 font-sans pb-20">
      <div className="max-w-7xl mx-auto p-4 md:p-8 mt-4 md:mt-8">
        {topPosts.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-[#800000] uppercase tracking-wide">See Latest</h2>
              <div className="flex-1 h-1 bg-gradient-to-r from-[#800000] to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:h-[600px]">
              {topPosts[0] && (
                <Link href={topPosts[0].slug ? `/post/${topPosts[0].slug}` : "/"} className="group relative rounded-2xl overflow-hidden shadow-2xl lg:col-span-2 h-[400px] lg:h-full block transform transition-transform duration-500 hover:-translate-y-2">
                  {topPosts[0].mainImage && (
                    <img src={urlFor(topPosts[0].mainImage).width(1200).height(800).url()} alt={topPosts[0].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#800000]/90 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full z-20">
                    {topPosts[0].category && (
                      <span className="inline-block bg-[#FFD700] text-[#800000] text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full mb-4 shadow-lg">
                        {topPosts[0].category}
                      </span>
                    )}
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
                      {topPosts[0].title}
                    </h3>
                    {topPosts[0].excerpt && (
                      <p className="text-gray-200 text-lg mb-4 line-clamp-2 max-w-2xl drop-shadow-sm">
                        {topPosts[0].excerpt}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-[#FFD700] text-xs font-bold uppercase tracking-widest">
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="M15 5l4 4"/></svg>
                      {topPosts[0].authorName || "Editorial Staff"}
                    </div>
                  </div>
                </Link>
              )}
              <div className="flex flex-col gap-6 lg:col-span-1 h-full">
                {topPosts[1] && (
                  <Link href={topPosts[1].slug ? `/post/${topPosts[1].slug}` : "/"} className="group relative rounded-2xl overflow-hidden shadow-xl flex-1 min-h-[250px] lg:min-h-0 block transform transition-transform duration-500 hover:-translate-y-2 border border-gray-200">
                    {topPosts[1].mainImage && (
                      <img src={urlFor(topPosts[1].mainImage).width(600).height(400).url()} alt={topPosts[1].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#800000]/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                      {topPosts[1].category && (
                        <span className="inline-block bg-[#FFD700] text-[#800000] text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full mb-3 shadow-md">
                          {topPosts[1].category}
                        </span>
                      )}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-md line-clamp-2">
                        {topPosts[1].title}
                      </h3>
                      <div className="flex items-center gap-2 text-[#FFD700] text-[10px] font-bold uppercase tracking-widest mt-2">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="M15 5l4 4"/></svg>
                        {topPosts[1].authorName || "Editorial Staff"}
                      </div>
                    </div>
                  </Link>
                )}
                {topPosts[2] && (
                  <Link href={topPosts[2].slug ? `/post/${topPosts[2].slug}` : "/"} className="group relative rounded-2xl overflow-hidden shadow-xl flex-1 min-h-[250px] lg:min-h-0 block transform transition-transform duration-500 hover:-translate-y-2 border border-gray-200">
                    {topPosts[2].mainImage && (
                      <img src={urlFor(topPosts[2].mainImage).width(600).height(400).url()} alt={topPosts[2].title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#800000]/90 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                      {topPosts[2].category && (
                        <span className="inline-block bg-[#FFD700] text-[#800000] text-[10px] font-bold uppercase tracking-widest py-1 px-3 rounded-full mb-3 shadow-md">
                          {topPosts[2].category}
                        </span>
                      )}
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 drop-shadow-md line-clamp-2">
                        {topPosts[2].title}
                      </h3>
                      <div className="flex items-center gap-2 text-[#FFD700] text-[10px] font-bold uppercase tracking-widest mt-2">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="M15 5l4 4"/></svg>
                        {topPosts[2].authorName || "Editorial Staff"}
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}
        <section className="mb-24">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#800000] tracking-tight">Explore Our Website!</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { link: "/about", img: "/explore-about.gif", alt: "About" },
              { link: "/staff", img: "/explore-board.gif", alt: "Editorial Board" },
              { link: "/category/updates", img: "/explore-updates.gif", alt: "Updates" }
            ].map((item, i) => (
              <Link key={i} href={item.link} className="group relative aspect-[3/4] md:aspect-[4/5] rounded-xl overflow-hidden shadow-lg block transform transition-transform duration-500 hover:-translate-y-2 bg-gray-200">
                <img src={item.img} alt={item.alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500"></div>
              </Link>
            ))}
          </div>
        </section>
        {categories.map((section, idx) => (
          section.data.length > 0 && (
            <section key={idx} className="mb-20 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">
              <Link href={`/category/${section.cat}`} className="relative overflow-hidden block rounded-xl mb-8 flex items-center justify-center shadow-lg h-24 md:h-32 group transition-all duration-500 hover:shadow-2xl">
                <img src="/bg-category.gif" alt={section.title} className="absolute inset-0 w-full h-full object-cover opacity-100 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#800000]/40 group-hover:bg-[#800000]/20 transition duration-500"></div>
                <h2 className="relative z-10 text-3xl md:text-4xl font-bold text-white drop-shadow-xl m-0 text-center">
                  {section.title}
                </h2>
              </Link>
              <div className="grid gap-8 md:grid-cols-3">
                {section.data.map((post: any) => (
                  <Link key={post._id} href={post.slug ? `/post/${post.slug}` : "/"} className="group bg-white rounded-xl hover:shadow-2xl transition duration-500 h-full flex flex-col overflow-hidden transform hover:-translate-y-1">
                    {post.mainImage && (
                      <div className="overflow-hidden h-56 relative rounded-t-xl">
                        <img src={urlFor(post.mainImage).width(600).height(400).url()} alt={post.title} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition duration-500"></div>
                      </div>
                    )}
                    <div className="pt-6 flex flex-col flex-grow">
                      <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#800000] transition line-clamp-2">
                        {post.title}
                      </h4>
                      {post.excerpt && (
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-4">
                        <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                          <svg width="12" height="12" fill="none" stroke="#800000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="M15 5l4 4"/></svg>
                          {post.authorName || "Staff Writer"}
                        </div>
                        <span className="text-[#800000] opacity-0 group-hover:opacity-100 transition duration-300 transform translate-x-2 group-hover:translate-x-0 font-bold">→</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        ))}
      </div>
    </main>
  );
}