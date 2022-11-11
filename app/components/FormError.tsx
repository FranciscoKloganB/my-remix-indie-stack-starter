import React from "react"

export function FormError({ children }: { children: React.ReactNode }) {
  return <em className="text-red-600">{children}</em>
}
