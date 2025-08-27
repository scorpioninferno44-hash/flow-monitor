import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Activity, ArrowRight } from "lucide-react"

const dataFlowLogs = [
  {
    id: "req_010",
    source: "dotnet-backend",
    target: "aws-cloudwatch",
    description: "Application metrics logged to CloudWatch",
    requestId: "req_010",
    responseTime: "150ms",
    timestamp: "4:04:05 PM",
    status: "success",
  },
  {
    id: "req_007",
    source: "aws-lambda",
    target: "mysql-database",
    description: "Lambda function updated database records",
    requestId: "req_007",
    responseTime: "180ms",
    timestamp: "4:03:30 PM",
    status: "success",
  },
  {
    id: "req_006",
    source: "dotnet-backend",
    target: "aws-lambda",
    description: "Background processing triggered via AWS Lambda",
    requestId: "req_006",
    responseTime: "200ms",
    timestamp: "4:03:25 PM",
    status: "success",
  },
  {
    id: "req_005",
    source: "nodejs-backend",
    target: "aws-s3",
    description: "File uploaded to S3 bucket",
    requestId: "req_005",
    responseTime: "95ms",
    timestamp: "4:02:10 PM",
    status: "success",
  },
  {
    id: "req_005b",
    source: "dotnet-backend",
    target: "aws-s3",
    description: "File uploaded to S3 via .NET AWS SDK",
    requestId: "req_005",
    responseTime: "95ms",
    timestamp: "4:02:10 PM",
    status: "success",
  },
  {
    id: "req_009",
    source: "dotnet-backend",
    target: "payment-gateway",
    description: "Payment processed successfully via external API",
    requestId: "req_009",
    responseTime: "250ms",
    timestamp: "4:01:40 PM",
    status: "success",
  },
  {
    id: "req_002",
    source: "nodejs-backend",
    target: "mysql-database",
    description: "User data retrieved from database",
    requestId: "req_002",
    responseTime: "45ms",
    timestamp: "4:00:20 PM",
    status: "success",
  },
  {
    id: "req_002b",
    source: "dotnet-backend",
    target: "mysql-database",
    description: "Entity Framework query executed successfully",
    requestId: "req_002",
    responseTime: "45ms",
    timestamp: "4:00:20 PM",
    status: "success",
  },
]

interface DataFlowMonitorProps {
  title?: string
  maxItems?: number
  showHeader?: boolean
}

export function DataFlowMonitor({ title = "Recent Data Flow", maxItems, showHeader = true }: DataFlowMonitorProps) {
  const displayLogs = maxItems ? dataFlowLogs.slice(0, maxItems) : dataFlowLogs

  return (
    <Card className="bg-card border-border">
      {showHeader && (
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            {title}
          </CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-6">
        <div className="space-y-4">
          {displayLogs.map((log) => (
            <div key={log.id} className="flex items-center gap-4 p-3 bg-secondary rounded-lg">
              {/* Status Icon */}
              <CheckCircle className="w-5 h-5 text-teal-400 flex-shrink-0" />

              {/* Flow Information */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">{log.source}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{log.target}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{log.description}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>Request ID: {log.requestId}</span>
                </div>
              </div>

              {/* Response Time and Timestamp */}
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <Badge variant="secondary" className="bg-teal-500/20 text-teal-400 border-teal-500/30">
                  {log.responseTime}
                </Badge>
                <span className="text-xs text-muted-foreground">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
