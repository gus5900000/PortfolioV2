'use client';

import { Badge } from "./ui/badge";

interface TagBadgeProps {
  tag: string;
  className?: string;
}

export function TagBadge({ tag, className = "" }: Readonly<TagBadgeProps>) {

const colorVariants: Record<string, string> = {
  PHP: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700 hover:bg-purple-200 dark:hover:bg-purple-900/50",
  MySQL: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/50",
  JavaScript: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700 hover:bg-yellow-200 dark:hover:bg-yellow-900/50",
  CSS: "bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-700 hover:bg-pink-200 dark:hover:bg-pink-900/50",
  "API REST": "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-700 hover:bg-indigo-200 dark:hover:bg-indigo-900/50",
  Epitech: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 hover:bg-emerald-200 dark:hover:bg-emerald-900/50",
  Prototype: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700 hover:bg-teal-200 dark:hover:bg-teal-900/50",
  IOS: "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-900/50",
  Swift: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-700 hover:bg-orange-200 dark:hover:bg-orange-900/50",
  React: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-700 hover:bg-cyan-200 dark:hover:bg-cyan-900/50",
  NextJS: "bg-black/10 dark:bg-white/10 text-black dark:text-white border-black/20 dark:border-white/20 hover:bg-black/20 dark:hover:bg-white/20",
  TypeScript: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700 hover:bg-blue-200 dark:hover:bg-blue-900/50",
  TailwindCSS: "bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-700 hover:bg-sky-200 dark:hover:bg-sky-900/50",
  Python: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-700 hover:bg-green-200 dark:hover:bg-green-900/50",
  PyQt5: "bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 border-lime-200 dark:border-lime-700 hover:bg-lime-200 dark:hover:bg-lime-900/50",
  API: "bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-700 hover:bg-violet-200 dark:hover:bg-violet-900/50",
  Pyxel: "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-700 hover:bg-rose-200 dark:hover:bg-rose-900/50",
  Framework: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700 hover:bg-amber-200 dark:hover:bg-amber-900/50",
  Jeu: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-900/50",
  Hackathon: "bg-fuchsia-100 dark:bg-fuchsia-900/30 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-200 dark:border-fuchsia-700 hover:bg-fuchsia-200 dark:hover:bg-fuchsia-900/50",
  Retro: "bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-900/50",
};

  const colorClass = colorVariants[tag] || "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700";

  return (
    <Badge 
      variant="outline" 
      className={`${colorClass} ${className}`}
    >
      {tag}
    </Badge>
  );
}