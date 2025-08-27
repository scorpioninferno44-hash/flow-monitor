"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, ExternalLink, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ErrorDetailModal } from "@/components/error-detail-modal"
import { useState } from "react"

const errorLogs = [
  {
    id: 1,
    type: "API Error",
    severity: "high",
    message: ".NET API validation error - Invalid model state",
    timestamp: "16/1/2024, 3:59:15 PM",
    source: "dotnet-backend",
    endpoint: "/api/validation",
    statusCode: 400,
  },
  {
    id: 2,
    type: "Payment Error",
    severity: "critical",
    message: "Payment processing failed - Invalid card number",
    timestamp: "16/1/2024, 3:55:30 PM",
    source: "payment-gateway",
    endpoint: "/api/payments/process",
    statusCode: 422,
  },
  {
    id: 3,
    type: "API Error",
    severity: "high",
    message: "Payment processing failed - .NET API returned 400 Bad Request",
    timestamp: "16/1/2024, 3:55:30 PM",
    source: "dotnet-backend",
    endpoint: "/api/payments",
    statusCode: 400,
  },
  {
    id: 4,
    type: "Database Error",
    severity: "medium",
    message: "Connection timeout to MySQL database",
    timestamp: "16/1/2024, 3:45:22 PM",
    source: "mysql-database",
    endpoint: "/db/connection",
    statusCode: 500,
  },
  {
    id: 5,
    type: "Authentication Error",
    severity: "medium",
    message: "JWT token validation failed - Token expired",
    timestamp: "16/1/2024, 3:42:18 PM",
    source: "auth-service",
    endpoint: "/api/auth/validate",
    statusCode: 401,
  },
]

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "high":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    default:
      return "bg-slate-500/20 text-slate-400 border-slate-500/30"
  }
}

const getStatusCodeColor = (code: number) => {
  if (code >= 500) return "text-red-400"
  if (code >= 400) return "text-orange-400"
  return "text-slate-400"
}

export default function ErrorLogsPage() {
  const [selectedError, setSelectedError] = useState<(typeof errorLogs)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleViewDetails = (error: (typeof errorLogs)[0]) => {
    setSelectedError(error)
    setIsModalOpen(true)
  }

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Error Logs</h1>
        </div>
        <p className="text-muted-foreground">Track and analyze system errors</p>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search error logs..."
              className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
        <Button
          variant="outline"
          className="bg-card border-border text-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Recent Errors */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Errors</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {errorLogs.map((error) => (
              <div key={error.id} className="bg-secondary rounded-lg p-4 space-y-3">
                {/* Error Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className={getSeverityColor(error.severity)}>
                      {error.severity}
                    </Badge>
                    <Badge variant="outline" className="border-border text-foreground">
                      {error.type}
                    </Badge>
                    <span className={`text-sm font-mono ${getStatusCodeColor(error.statusCode)}`}>
                      {error.statusCode}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{error.timestamp}</span>
                  </div>
                </div>

                {/* Error Message */}
                <div>
                  <p className="text-[#f05555] text-sm font-medium mb-2">{error.message}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>
                      <strong>Source:</strong> {error.source}
                    </span>
                    <span>
                      <strong>Endpoint:</strong> {error.endpoint}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 text-muted-foreground hover:text-foreground"
                      onClick={() => handleViewDetails(error)}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Error Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">3</p>
              <p className="text-sm text-muted-foreground">Critical Errors</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-400">7</p>
              <p className="text-sm text-muted-foreground">High Priority</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">12</p>
              <p className="text-sm text-muted-foreground">Medium Priority</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-teal-400">24h</p>
              <p className="text-sm text-muted-foreground">Avg Resolution</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <ErrorDetailModal error={selectedError} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
