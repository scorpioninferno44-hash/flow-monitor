"use client"

import { Button } from "@/components/ui/button"
import { Play, Pause, Undo2, RotateCcw, GitBranch, CheckCircle, AlertTriangle, AlertCircle } from "lucide-react"
import { useState, useEffect } from "react"
import { FlowDiagram } from "@/components/flow-diagram"

export default function SystemFlowPage() {
  const [lastUpdated, setLastUpdated] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Update timestamp every minute
    const updateTime = () => {
      const now = new Date()
      setLastUpdated(
        now.toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
        }),
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  const statusCounts = {
    healthy: 12,
    errors: 0,
    warnings: 2,
  }

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    // Reset flow diagram
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">System Flow Diagram</h1>
            </div>
            <p className="text-muted-foreground">Interactive visualization of your data flow</p>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`${isPlaying ? "bg-teal-600 text-white border-teal-600" : "bg-background"}`}
              onClick={handlePlay}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button variant="outline" size="sm">
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Flow Diagram Canvas */}
      <div className="flex-1 bg-background relative">
        <FlowDiagram isPlaying={isPlaying} />
      </div>

      {/* Status Bar */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Healthy Status */}
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{statusCounts.healthy}</span> Healthy
              </span>
            </div>

            {/* Errors Status */}
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{statusCounts.errors}</span> Errors
              </span>
            </div>

            {/* Warnings Status */}
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
              <span className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{statusCounts.warnings}</span> Warnings
              </span>
            </div>
          </div>

          {/* Last Updated */}
          <div className="text-sm text-muted-foreground">
            Last updated: <span className="text-foreground">{lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
