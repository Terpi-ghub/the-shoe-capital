import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-[#800000] text-white py-12 px-8 border-t-4 border-[#FFD700] mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#FFD700] mb-2">
            The Shoe Capital
          </h2>
          <p className="text-gray-200 text-sm max-w-md">
            The official English journalism publication of Marikina High School. Uncovering Truth, Amplifying Voices.
          </p>
        </div>
        <div className="flex space-x-6 text-sm font-bold uppercase tracking-widest text-[#FFD700]">
          <Link href="/about" className="hover:text-white transition">About Us</Link>
          <Link href="/staff" className="hover:text-white transition">Editorial Staff</Link>
          <Link href="/" className="hover:text-white transition">Home</Link>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-[#FFD700]/30 text-center text-xs text-gray-300 uppercase tracking-widest">
        &copy; {new Date().getFullYear()} The Shoe Capital. All rights reserved.
      </div>
    </footer>
  );
}