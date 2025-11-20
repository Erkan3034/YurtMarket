"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    return (
      <div className="flex w-full flex-col gap-1">
        {label ? (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-600">
            {label}
          </label>
        ) : null}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200",
            error && "border-rose-400",
            className,
          )}
          {...props}
        />
        {(error || helperText) && (
          <p className={cn("text-xs", error ? "text-rose-500" : "text-slate-500")}>{error ?? helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

