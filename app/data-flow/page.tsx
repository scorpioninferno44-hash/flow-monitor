import { DataFlowMonitor } from "@/components/data-flow-monitor"
import { ArrowRightLeft } from "lucide-react"

export default function DataFlowPage() {
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <ArrowRightLeft className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Data Flow Monitoring</h1>
        </div>
        <p className="text-muted-foreground">Real-time tracking of data flow between system components</p>
      </div>

      {/* Data Flow Monitor */}
      <DataFlowMonitor showHeader={false} />

      {/* Flow Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">847</p>
            <p className="text-sm text-muted-foreground">Total Requests</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-chart-2">98.5%</p>
            <p className="text-sm text-muted-foreground">Success Rate</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-chart-1">125ms</p>
            <p className="text-sm text-muted-foreground">Avg Response</p>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-chart-5">24</p>
            <p className="text-sm text-muted-foreground">Active Flows</p>
          </div>
        </div>
      </div>
    </div>
  )
}
