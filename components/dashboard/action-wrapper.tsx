"use client";

export function ActionWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
}
