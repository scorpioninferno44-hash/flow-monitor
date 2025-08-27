import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DataFlowMonitor } from "@/components/data-flow-monitor"
import {
  CheckCircle,
  TrendingUp,
  Clock,
  AlertTriangle,
  Activity,
  Database,
  Cloud,
  CreditCard,
  Server,
  Zap,
  ExternalLink,
} from "lucide-react"

const metricsData = [
  {
    title: "System Health",
    value: "12/14",
    subtitle: "Nodes Online",
    change: "+2% from yesterday",
    changeType: "positive",
    icon: CheckCircle,
    color: "text-teal-400",
  },
  {
    title: "Success Rate",
    value: "66.7%",
    subtitle: "Requests Successful",
    change: "+0.5% from last hour",
    changeType: "positive",
    icon: TrendingUp,
    color: "text-teal-400",
  },
  {
    title: "Response Time",
    value: "142ms",
    subtitle: "Average Response",
    change: "-15ms from last hour",
    changeType: "positive",
    icon: Clock,
    color: "text-teal-400",
  },
  {
    title: "Active Errors",
    value: "0",
    subtitle: "Critical Issues",
    change: "No active errors",
    changeType: "positive",
    icon: AlertTriangle,
    color: "text-teal-400",
  },
]

const systemComponents = [
  {
    name: "Angular Frontend",
    type: "Angular 15",
    status: "healthy",
    response: "120ms",
    successRate: "99.5%",
    icon: Activity,
  },
  {
    name: "Node.js Backend",
    type: "Node.js + Express",
    status: "healthy",
    response: "85ms",
    successRate: "98.2%",
    icon: Server,
  },
  {
    name: "MySQL Database",
    type: "MySQL 8.0 on AWS RDS",
    status: "healthy",
    response: "45ms",
    successRate: "99.8%",
    icon: Database,
  },
  {
    name: "AWS S3",
    type: "AWS S3",
    status: "healthy",
    response: "95ms",
    successRate: "99.9%",
    icon: Cloud,
  },
  {
    name: "Redis Cache",
    type: "Redis 7.0",
    status: "warning",
    response: "15ms",
    successRate: "96.5%",
    icon: Zap,
  },
  {
    name: "Payment API",
    type: "Stripe API",
    status: "healthy",
    response: "250ms",
    successRate: "99.1%",
    icon: CreditCard,
  },
  {
    name: "Angular Frontend",
    type: "Angular 15",
    status: "healthy",
    response: "120ms",
    successRate: "99.5%",
    icon: Activity,
  },
  {
    name: ".NET Backend",
    type: ".NET Core 6.0",
    status: "healthy",
    response: "85ms",
    successRate: "98.2%",
    icon: Server,
  },
  {
    name: "MySQL Database",
    type: "MySQL 8.0",
    status: "healthy",
    response: "45ms",
    successRate: "99.8%",
    icon: Database,
  },
  {
    name: "AWS S3",
    type: "AWS S3",
    status: "healthy",
    response: "95ms",
    successRate: "99.9%",
    icon: Cloud,
  },
]

const recentErrors = [
  {
    type: "request",
    source: "angular-frontend",
    target: "dotnet-backend",
    message: ".NET API validation error - Invalid model state",
    timestamp: "16/1/2024, 3:59:15 PM",
  },
  {
    type: "request",
    source: "angular-frontend",
    target: "nodejs-backend",
    message: "Payment processing failed - Invalid card number",
    timestamp: "16/1/2024, 3:55:30 PM",
  },
  {
    type: "request",
    source: "angular-frontend",
    target: "dotnet-backend",
    message: "Payment processing failed - .NET API returned 400 Bad Request",
    timestamp: "16/1/2024, 3:55:30 PM",
  },
]

const quickStats = [
  { label: "Total Requests Today", value: "15", color: "text-primary" },
  { label: "Error Rate", value: "20.0%", color: "text-destructive" },
  { label: "Data Processed", value: "10.0MB", color: "text-chart-1" },
]

export default function OverviewPage() {
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">System Overview</h1>
        </div>
        <p className="text-muted-foreground">Monitor your application's data flow and system health in real-time</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((metric) => {
          const Icon = metric.icon
          return (
            <Card key={metric.title} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Icon className={`w-6 h-6 ${metric.color}`} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.subtitle}</p>
                  <p className="text-xs text-teal-400">{metric.change}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Components */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Server className="w-5 h-5" />
                System Components
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systemComponents.map((component, index) => {
                  const Icon = component.icon
                  return (
                    <div key={index} className="bg-secondary rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <h3 className="text-sm font-medium text-foreground">{component.name}</h3>
                            <p className="text-xs text-muted-foreground">{component.type}</p>
                          </div>
                        </div>
                        <Badge
                          variant={component.status === "healthy" ? "default" : "secondary"}
                          className={
                            component.status === "healthy"
                              ? "bg-teal-500/20 text-teal-400 border-teal-500/30"
                              : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                          }
                        >
                          {component.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <p className="text-muted-foreground">Response</p>
                          <p className="text-teal-400 font-medium">{component.response}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Success Rate</p>
                          <p className="text-foreground font-medium">{component.successRate}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Errors */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-400" />
                Recent Errors
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {recentErrors.map((error, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                      {error.type}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {error.source} → {error.target}
                    </span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-foreground">{error.message}</p>
                  <p className="text-xs text-muted-foreground">{error.timestamp}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Zap className="w-5 h-5 text-teal-400" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                  <span className={`text-sm font-medium ${stat.color}`}>{stat.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Data Flow Monitor */}
      <DataFlowMonitor maxItems={6} />
    </div>
  )
}
