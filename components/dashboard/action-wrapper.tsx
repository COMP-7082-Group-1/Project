"use client";

/** Thin client wrapper that enables interactive children inside server-rendered dashboard sections. */
export function ActionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
}
