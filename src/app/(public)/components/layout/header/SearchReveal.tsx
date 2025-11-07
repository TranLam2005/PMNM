'use client';
import { Search } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearch } from "@/hooks";
import { useRouter } from "next/navigation";

function SearchReveal() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  const onSubmit = () => {
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle search"
        className="rounded-xl border border-slate-200 p-2 hover:bg-slate-50 transition"
      >
        <Search className="h-5 w-5" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="search-input"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="absolute right-0 top-1/2 -translate-y-1/2 origin-right"
          >
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
            <Search className="h-4 w-4 text-slate-500" />
            <input
              autoFocus
              onBlur={() => setOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSubmit()
              }}
              placeholder="Search..."
              className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchReveal;