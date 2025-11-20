"use client";

import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, className, error, id, ...props }, ref) => {
    const selectId = id ?? props.name;
    return (
      <div className="flex w-full flex-col gap-1">
        {label ? (
          <label htmlFor={selectId} className="text-sm font-medium text-slate-600">
            {label}
          </label>
        ) : null}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            "h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200",
            error && "border-rose-400",
            className,
          )}
          {...props}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error ? <p className="text-xs text-rose-500">{error}</p> : null}
      </div>
    );
  },
);

Select.displayName = "Select";

