import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Link from "next/link";
export const revalidate = 0; // <--- ADD THIS LINE HERE
export default async function StaffPage() {
  const authors = await client.fetch(`*[_type == "author"] | order(rank asc) {
    _id,
    name,
    position,
    categories,
    bio,
    "slug": slug.current,
    image
  }`);
  return (
    <main className="min-h-screen bg-white font-sans">
      <div className="max-w-4xl mx-auto p-8 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#800000] border-b-4 border-[#FFD700] pb-4 mb-8 text-center inline-block w-full">
          Editorial Staff
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center max-w-3xl mx-auto">
          The Editorial Staff of the Shoe Capital is composed of dedicated student leaders, writers, editors, and creatives who uphold the publication’s mission of truthful and responsible journalism. They ensure that every story is produced with accuracy, fairness, integrity, and purpose.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-12 text-center max-w-3xl mx-auto">
          They lead the publication’s operations, oversee content production, and maintain high journalistic standards while fostering collaboration among staff members. More than titleholders, they are stewards of student voice and leaders committed to informing and inspiring the MHSian community.
        </p>
        <div className="flex flex-col gap-8">
          {authors.map((author: any) => (
            <Link key={author._id} href={author.slug ? `/author/${author.slug}` : "#"} className="group flex flex-col md:flex-row items-center md:items-start gap-8 p-6 border border-gray-100 rounded-xl hover:shadow-xl transition bg-gray-50">
              {author.image ? (
                <img src={urlFor(author.image).width(200).height(200).url()} alt={author.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover shadow-md border-4 border-[#FFD700] group-hover:scale-105 transition flex-shrink-0" />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-300 shadow-md border-4 border-[#FFD700] flex items-center justify-center text-gray-500 font-bold text-4xl flex-shrink-0">
                  {author.name.charAt(0)}
                </div>
              )}
              <div className="text-center md:text-left flex-1 py-2">
                <h3 className="text-3xl font-bold text-gray-900 group-hover:text-[#800000] transition mb-2">
                  {author.name}
                </h3>
                {author.position && (
                  <p className="text-[#800000] font-bold uppercase tracking-widest text-sm mb-3">{author.position}</p>
                )}
                {author.categories && author.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                    {author.categories.map((cat: string) => (
                      <span key={cat} className="bg-white border border-[#FFD700] text-[#800000] text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                )}
                {author.bio && (
                  <div className="prose prose-sm text-gray-600 line-clamp-3">
                    <PortableText value={author.bio} />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}