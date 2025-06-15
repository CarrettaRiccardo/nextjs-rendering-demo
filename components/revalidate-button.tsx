"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { useState } from "react"

interface RevalidateButtonProps {
  action: () => Promise<void>
  label: string
}

export function RevalidateButton({ action, label }: RevalidateButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleRevalidate = async () => {
    setIsLoading(true)
    try {
      await action()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleRevalidate} disabled={isLoading} variant="outline" size="sm">
      <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
      {label}
    </Button>
  )
}
