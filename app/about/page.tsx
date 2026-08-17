import Link from "next/link";
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      <div className="max-w-4xl mx-auto p-8 py-16">
        <h1 className="text-5xl font-black text-[#800000] mb-2 tracking-tight">About</h1>
        <h2 className="text-[#F59E0B] font-bold text-lg mb-4">Uncovering Truth, Amplifying Voices</h2>
        <p className="font-bold text-lg mb-8 leading-relaxed">
          Explore the different sections of TSC, where every piece is crafted to inform, challenge, and inspire. From facts that matter to stories that move, from bold opinions to creative expression—this is where every story begins.
        </p>
        <hr className="border-t border-gray-300 my-8" />
        <h3 className="text-[#800000] font-bold text-lg mb-2 uppercase tracking-wide">FIND YOUR READ</h3>
        <p className="italic mb-6">Not sure where to start? We've got you.</p>
        <ul className="space-y-1 mb-8">
          <li>Looking for facts and updates? Head to <Link href="/category/news" className="underline hover:text-[#800000]">News</Link>.</li>
          <li>Craving bold stands and critical insights? Explore <Link href="/category/editorial" className="underline hover:text-[#800000]">Editorial</Link> and <Link href="/category/column" className="underline hover:text-[#800000]">Column</Link>.</li>
          <li>Want stories that hit deeper? Dive into <Link href="/category/feature" className="underline hover:text-[#800000]">Feature</Link> and <Link href="/category/literary" className="underline hover:text-[#800000]">Literary</Link>.</li>
          <li>Curious about innovation and discovery? Check out <Link href="/category/sci-tech" className="underline hover:text-[#800000]">Sci-Tech</Link>.</li>
          <li>Into action, competition, and school pride? Visit <Link href="/category/sports" className="underline hover:text-[#800000]">Sports</Link>.</li>
          <li>Prefer visuals that speak volumes? See <Link href="/category/graphics" className="underline hover:text-[#800000]">Graphics</Link>.</li>
          <li>See the latest TSC announcements in <Link href="/category/updates" className="underline hover:text-[#800000]">Updates</Link>.</li>
        </ul>
        <hr className="border-t border-gray-300 my-8" />
        <h3 className="text-[#800000] font-bold text-lg mb-4 uppercase tracking-wide">ABOUT TSC</h3>
        <p className="mb-4 leading-relaxed">
          The Shoe Capital (TSC) is more than a publication—it is a platform of voices, a space for truth, and a canvas for creativity. Driven by student journalists, TSC upholds the values of integrity, relevance, and expression in every story it tells.
        </p>
        <p className="mb-6 leading-relaxed">
          Every category tells a different story.
        </p>
        <p className="text-[#800000] font-bold italic text-lg mb-8">
          The question is—where will you begin?
        </p>
        <div className="flex gap-4">
          <a href="#" className="bg-black text-white p-2 rounded-full hover:scale-110 transition flex items-center justify-center w-10 h-10" aria-label="Facebook">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </a>
          <a href="#" className="bg-black text-white p-2 rounded-full hover:scale-110 transition flex items-center justify-center w-10 h-10" aria-label="Instagram">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="#" className="bg-black text-white p-2 rounded-full hover:scale-110 transition flex items-center justify-center w-10 h-10" aria-label="Email">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </a>
        </div>
      </div>
    </main>
  );
}