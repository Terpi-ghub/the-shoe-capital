"use client";
import { useRouter, useSearchParams } from "next/navigation";
export default function CategorySorter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "latest";
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", newSort);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
      <label htmlFor="sort" className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sort by:</label>
      <select id="sort" value={currentSort} onChange={handleSort} className="bg-transparent text-[#800000] font-bold text-sm outline-none cursor-pointer w-full md:w-auto">
        <option value="latest">Latest</option>
        <option value="hot">Hot</option>
        <option value="popular">Most Popular</option>
        <option value="oldest">Oldest</option>
      </select>
    </div>
  );
}