"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Clock, Users, Server, Activity, ExternalLink } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Sample data for charts
const performanceData = [
  { time: "00:00", cpu: 45, memory: 62, response: 120 },
  { time: "04:00", cpu: 52, memory: 58, response: 135 },
  { time: "08:00", cpu: 78, memory: 71, response: 180 },
  { time: "12:00", cpu: 85, memory: 79, response: 220 },
  { time: "16:00", cpu: 92, memory: 85, response: 195 },
  { time: "20:00", cpu: 67, memory: 73, response: 165 },
]

const trafficData = [
  { hour: "00", requests: 1200, errors: 12 },
  { hour: "04", requests: 800, errors: 8 },
  { hour: "08", requests: 2400, errors: 18 },
  { hour: "12", requests: 3200, errors: 25 },
  { hour: "16", requests: 2800, errors: 22 },
  { hour: "20", requests: 1800, errors: 15 },
]

const endpointData = [
  { name: "/api/users", requests: 15420, avgTime: 145 },
  { name: "/api/orders", requests: 12350, avgTime: 220 },
  { name: "/api/products", requests: 9870, avgTime: 180 },
  { name: "/api/auth", requests: 8650, avgTime: 95 },
  { name: "/api/analytics", requests: 6420, avgTime: 310 },
]

const systemHealthData = [
  { name: "Healthy", value: 85, color: "#10b981" },
  { name: "Warning", value: 12, color: "#f59e0b" },
  { name: "Critical", value: 3, color: "#ef4444" },
]

const metricsData = [
  {
    title: "Total Requests",
    value: "2.4M",
    subtitle: "This Month",
    change: "+12.5% from last month",
    changeType: "positive",
    icon: TrendingUp,
    color: "text-teal-400",
  },
  {
    title: "Avg Response Time",
    value: "165ms",
    subtitle: "System Average",
    change: "-8.2% from last month",
    changeType: "positive",
    icon: Clock,
    color: "text-teal-400",
  },
  {
    title: "Active Users",
    value: "12,847",
    subtitle: "Currently Online",
    change: "+5.1% from last month",
    changeType: "positive",
    icon: Users,
    color: "text-teal-400",
  },
  {
    title: "System Uptime",
    value: "99.9%",
    subtitle: "This Month",
    change: "+0.1% from last month",
    changeType: "positive",
    icon: Server,
    color: "text-teal-400",
  },
]

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">System Analytics</h1>
        </div>
        <p className="text-muted-foreground">Deep insights into your system performance and usage patterns</p>
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

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Performance
            </CardTitle>
            <CardDescription className="text-muted-foreground">CPU, Memory, and Response Time trends</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" opacity={0.3} />
                <XAxis
                  dataKey="time"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={{ stroke: "var(--muted-foreground)" }}
                  axisLine={{ stroke: "var(--muted-foreground)" }}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={{ stroke: "var(--muted-foreground)" }}
                  axisLine={{ stroke: "var(--muted-foreground)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--foreground)",
                  }}
                />
                <Line type="monotone" dataKey="cpu" stroke="#3b82f6" strokeWidth={2} name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#10b981" strokeWidth={2} name="Memory %" />
                <Line type="monotone" dataKey="response" stroke="#f59e0b" strokeWidth={2} name="Response (ms)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Traffic Analytics
            </CardTitle>
            <CardDescription className="text-muted-foreground">Requests and error rates over time</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={trafficData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--muted-foreground)" opacity={0.3} />
                <XAxis
                  dataKey="hour"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={{ stroke: "var(--muted-foreground)" }}
                  axisLine={{ stroke: "var(--muted-foreground)" }}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={{ stroke: "var(--muted-foreground)" }}
                  axisLine={{ stroke: "var(--muted-foreground)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    color: "var(--foreground)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="requests"
                  stackId="1"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.6}
                  name="Requests"
                />
                <Area
                  type="monotone"
                  dataKey="errors"
                  stackId="2"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.6}
                  name="Errors"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top API Endpoints */}
        <div className="lg:col-span-2">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Server className="w-5 h-5" />
                Top API Endpoints
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Most requested endpoints and their performance
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {endpointData.map((endpoint, index) => (
                  <div key={index} className="bg-secondary rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <h3 className="text-sm font-medium text-foreground">{endpoint.name}</h3>
                          <p className="text-xs text-muted-foreground">{endpoint.requests.toLocaleString()} requests</p>
                        </div>
                      </div>
                      <Badge className="bg-teal-500/20 text-teal-400 border-teal-500/30">Active</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="text-muted-foreground">Avg Response</p>
                        <p className="text-teal-400 font-medium">{endpoint.avgTime}ms</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Requests</p>
                        <p className="text-foreground font-medium">{endpoint.requests.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Health */}
        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-400" />
                System Health
              </CardTitle>
              <CardDescription className="text-muted-foreground">Overall system status distribution</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={systemHealthData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {systemHealthData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                      // color: "var(--foreground)",
                    }}
                    labelStyle={{
                      color: "var(--foreground)",
                    }}
                    itemStyle={{
                      color: "var(--foreground)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-4">
                {systemHealthData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-foreground">{item.name}</span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Status Distribution</span>
                      <span className="text-sm font-medium text-foreground">{item.value}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
