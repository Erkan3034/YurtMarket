import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className, ...props }: CardProps) => (
  <div className={cn("rounded-2xl border border-slate-100 bg-white p-6 shadow-sm", className)} {...props} />
);

