"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Clock, Server, Code, RefreshCw, CheckCircle, MessageSquare, Copy, Download } from "lucide-react"

interface ErrorLog {
  id: number
  type: string
  severity: string
  message: string
  timestamp: string
  source: string
  endpoint: string
  statusCode: number
}

interface ErrorDetailModalProps {
  error: ErrorLog | null
  isOpen: boolean
  onClose: () => void
}

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

export function ErrorDetailModal({ error, isOpen, onClose }: ErrorDetailModalProps) {
  const [notes, setNotes] = useState("")
  const [assignee, setAssignee] = useState("")
  const [status, setStatus] = useState("open")

  if (!error) return null

  const mockStackTrace = `Error: ${error.message}
    at ValidationController.ValidateModel (ValidationController.cs:45)
    at Microsoft.AspNetCore.Mvc.Infrastructure.ActionMethodExecutor.Execute (ActionMethodExecutor.cs:62)
    at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.InvokeActionMethodAsync (ControllerActionInvoker.cs:234)
    at Microsoft.AspNetCore.Mvc.Infrastructure.ControllerActionInvoker.Next (ControllerActionInvoker.cs:123)
    at Microsoft.AspNetCore.Authorization.AuthorizationMiddleware.Invoke (AuthorizationMiddleware.cs:78)`

  const mockRequestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    },
    body: `{
  "email": "user@example.com",
  "password": "",
  "confirmPassword": "password123"
}`,
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="!max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-foreground">
            <div className="w-8 h-8 bg-red-700 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            Error Details - #{error.id}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Error Overview */}
          <div className="bg-secondary rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className={getSeverityColor(error.severity)}>
                  {error.severity}
                </Badge>
                <Badge variant="outline" className="border-border text-foreground">
                  {error.type}
                </Badge>
                <span className="text-sm font-mono text-red-400">{error.statusCode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{error.timestamp}</span>
              </div>
            </div>
            <p className="text-[#f45a5a] text-sm font-medium">{error.message}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Server className="w-4 h-4" />
                {error.source}
              </span>
              <span className="flex items-center gap-1">
                <Code className="w-4 h-4" />
                {error.endpoint}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stack Trace */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Stack Trace</h3>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Copy className="w-4 h-4 mr-1" />
                  Copy
                </Button>
              </div>
              <div className="bg-secondary rounded-lg p-4">
                <pre className="text-sm text-muted-foreground font-mono whitespace-pre-wrap overflow-x-auto">
                  {mockStackTrace}
                </pre>
              </div>
            </div>

            {/* Request Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Request Details</h3>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </Button>
              </div>
              <div className="bg-secondary rounded-lg p-4 space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Method</p>
                  <p className="text-sm text-muted-foreground font-mono">{mockRequestData.method}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Headers</p>
                  <pre className="text-xs text-muted-foreground font-mono">
                    {JSON.stringify(mockRequestData.headers, null, 2)}
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Request Body</p>
                  <pre className="text-xs text-muted-foreground font-mono">{mockRequestData.body}</pre>
                </div>
              </div>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Troubleshooting Actions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Troubleshooting Actions</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Quick Actions */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Quick Actions</h4>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="bg-card border-border text-foreground hover:bg-accent">
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Retry Request
                  </Button>
                  <Button variant="outline" size="sm" className="bg-card border-border text-foreground hover:bg-accent">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Mark Resolved
                  </Button>
                </div>
              </div>

              {/* Status & Assignment */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">Status & Assignment</h4>
                <div className="flex gap-2">
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="w-32 bg-input border-border text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={assignee} onValueChange={setAssignee}>
                    <SelectTrigger className="flex-1 bg-input border-border text-foreground">
                      <SelectValue placeholder="Assign to..." />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border">
                      <SelectItem value="john">John Doe</SelectItem>
                      <SelectItem value="jane">Jane Smith</SelectItem>
                      <SelectItem value="mike">Mike Johnson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-foreground">Add Notes</h4>
              <Textarea
                placeholder="Add troubleshooting notes, resolution steps, or comments..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                rows={3}
              />
              <Button size="sm" className="bg-green-600 text-primary-foreground hover:bg-green/90">
                <MessageSquare className="w-4 h-4 mr-1" />
                Save Notes
              </Button>
            </div>
          </div>

          {/* Context Information */}
          <div className="bg-secondary rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-medium text-foreground">Additional Context</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground mb-1">Affected Users</p>
                <p className="text-foreground font-medium">1,247 users</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Similar Errors (24h)</p>
                <p className="text-foreground font-medium">23 occurrences</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">First Occurrence</p>
                <p className="text-foreground font-medium">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
