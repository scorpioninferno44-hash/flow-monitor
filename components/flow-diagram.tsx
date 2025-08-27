"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import {
  Monitor,
  Server,
  Database,
  Cloud,
  Zap,
  CreditCard,
  FileText,
  Activity,
  Maximize2,
  Minimize2,
  X,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react"

interface FlowNode {
  id: string
  label: string
  type: "frontend" | "backend" | "database" | "aws" | "cache" | "payment" | "api"
  icon: React.ReactNode
  position: { x: number; y: number }
  status: "healthy" | "warning" | "error"
  connections: string[]
  size: "normal" | "large"
  minimized: boolean
  details: {
    description: string
    lastRequest: string
    responseTime: string
    successRate: string
    payload: any
    endpoints: string[]
    errorCount: number
    uptime: string
  }
}

interface FlowConnection {
  from: string
  to: string
  label: string
  active: boolean
  delay: number
}

interface FlowDiagramProps {
  isPlaying: boolean
}

interface NodeDetailsPopupProps {
  node: FlowNode | null
  onClose: () => void
}

function NodeDetailsPopup({ node, onClose }: NodeDetailsPopupProps) {
  if (!node) return null

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-5 h-5 text-teal-400" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-orange-400" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-400" />
      default:
        return <CheckCircle className="w-5 h-5 text-muted-foreground" />
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl border border-border max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-muted">{node.icon}</div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{node.label}</h2>
              <p className="text-muted-foreground text-sm">{node.details.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(node.status)}
                <span className="text-sm font-medium text-foreground">Status</span>
              </div>
              <p className="text-lg font-semibold text-foreground capitalize">{node.status}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Response</span>
              </div>
              <p className="text-lg font-semibold text-teal-400">{node.details.responseTime}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Success Rate</span>
              </div>
              <p className="text-lg font-semibold text-teal-400">{node.details.successRate}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">Uptime</span>
              </div>
              <p className="text-lg font-semibold text-teal-400">{node.details.uptime}</p>
            </div>
          </div>

          {/* Request/Response Details */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Recent Activity</h3>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Last Request:</span>
                  <p className="text-foreground font-mono text-sm">{node.details.lastRequest}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Error Count (24h):</span>
                  <p className="text-foreground font-semibold">{node.details.errorCount}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Endpoints</h3>
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="space-y-2">
                  {node.details.endpoints.map((endpoint, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                      <span className="text-sm font-mono text-muted-foreground">{endpoint}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Payload Information */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Sample Payload</h3>
            <div className="bg-muted rounded-lg p-4 border border-border">
              <pre className="text-sm text-muted-foreground overflow-x-auto">
                {JSON.stringify(node.details.payload, null, 2)}
              </pre>
            </div>
          </div>

          {/* Connections */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Connected Services</h3>
            <div className="flex flex-wrap gap-2">
              {node.connections.map((connectionId) => (
                <span
                  key={connectionId}
                  className="px-3 py-1 bg-teal-400/10 border border-teal-400/30 rounded-full text-sm text-teal-400"
                >
                  {connectionId.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FlowDiagram({ isPlaying }: FlowDiagramProps) {
  const [activeConnections, setActiveConnections] = useState<Set<string>>(new Set())
  const [animationStep, setAnimationStep] = useState(0)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [hasDragged, setHasDragged] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null)

  const [nodes, setNodes] = useState<FlowNode[]>([
    {
      id: "angular-frontend",
      label: "Angular Frontend",
      type: "frontend",
      icon: <Monitor className="w-5 h-5" />,
      position: { x: 100, y: 200 },
      status: "healthy",
      connections: ["nodejs-backend", "dotnet-backend"],
      size: "normal",
      minimized: false,
      details: {
        description: "Angular 15 frontend application serving the user interface",
        lastRequest: "GET /api/users - 2 minutes ago",
        responseTime: "120ms",
        successRate: "99.5%",
        uptime: "99.9%",
        errorCount: 2,
        endpoints: ["/dashboard", "/profile", "/settings"],
        payload: {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          body: { userId: 12345, action: "fetch_profile" },
        },
      },
    },
    {
      id: "nodejs-backend",
      label: "Node.js Backend",
      type: "backend",
      icon: <Server className="w-5 h-5" />,
      position: { x: 350, y: 150 },
      status: "healthy",
      connections: ["mysql-db", "redis-cache", "aws-s3"],
      size: "normal",
      minimized: false,
      details: {
        description: "Node.js Express server handling API requests and business logic",
        lastRequest: "POST /api/upload - 1 minute ago",
        responseTime: "85ms",
        successRate: "98.2%",
        uptime: "99.8%",
        errorCount: 5,
        endpoints: ["/api/users", "/api/upload", "/api/auth"],
        payload: {
          method: "POST",
          headers: { Authorization: "Bearer token123" },
          body: { file: "document.pdf", size: "2.5MB" },
        },
      },
    },
    {
      id: "dotnet-backend",
      label: ".NET Backend",
      type: "backend",
      icon: <Server className="w-5 h-5" />,
      position: { x: 350, y: 250 },
      status: "healthy",
      connections: ["mysql-db", "payment-gateway", "aws-lambda"],
      size: "normal",
      minimized: false,
      details: {
        description: ".NET Core API handling payment processing and data operations",
        lastRequest: "POST /api/payment - 30 seconds ago",
        responseTime: "95ms",
        successRate: "99.1%",
        uptime: "99.7%",
        errorCount: 1,
        endpoints: ["/api/payment", "/api/orders", "/api/inventory"],
        payload: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: { amount: 99.99, currency: "USD", cardToken: "tok_123" },
        },
      },
    },
    {
      id: "mysql-db",
      label: "MySQL Database",
      type: "database",
      icon: <Database className="w-5 h-5" />,
      position: { x: 600, y: 200 },
      status: "healthy",
      connections: [],
      size: "normal",
      minimized: false,
      details: {
        description: "MySQL 8.0 database on AWS RDS storing application data",
        lastRequest: "SELECT * FROM users - 45 seconds ago",
        responseTime: "45ms",
        successRate: "99.8%",
        uptime: "99.9%",
        errorCount: 0,
        endpoints: ["users", "orders", "products", "payments"],
        payload: {
          query: "SELECT id, name, email FROM users WHERE active = 1",
          params: { active: 1 },
          result: { rows: 1250, executionTime: "45ms" },
        },
      },
    },
    {
      id: "redis-cache",
      label: "Redis Cache",
      type: "cache",
      icon: <Zap className="w-5 h-5" />,
      position: { x: 600, y: 100 },
      status: "warning",
      connections: [],
      size: "normal",
      minimized: false,
      details: {
        description: "Redis 7.0 in-memory cache for session and data caching",
        lastRequest: "GET user:12345 - 10 seconds ago",
        responseTime: "15ms",
        successRate: "96.5%",
        uptime: "98.5%",
        errorCount: 12,
        endpoints: ["sessions", "cache", "pub/sub"],
        payload: {
          command: "GET",
          key: "user:12345",
          value: { id: 12345, name: "John Doe", lastLogin: "2024-01-16T15:30:00Z" },
        },
      },
    },
    {
      id: "aws-s3",
      label: "AWS S3",
      type: "aws",
      icon: <Cloud className="w-5 h-5" />,
      position: { x: 600, y: 50 },
      status: "healthy",
      connections: [],
      size: "normal",
      minimized: false,
      details: {
        description: "AWS S3 bucket for file storage and static assets",
        lastRequest: "PUT /bucket/file.pdf - 2 minutes ago",
        responseTime: "95ms",
        successRate: "99.9%",
        uptime: "99.99%",
        errorCount: 0,
        endpoints: ["/uploads", "/assets", "/backups"],
        payload: {
          operation: "PUT",
          bucket: "app-storage",
          key: "uploads/document.pdf",
          size: "2.5MB",
          contentType: "application/pdf",
        },
      },
    },
    {
      id: "aws-lambda",
      label: "AWS Lambda",
      type: "aws",
      icon: <Activity className="w-5 h-5" />,
      position: { x: 600, y: 300 },
      status: "healthy",
      connections: ["aws-cloudwatch"],
      size: "normal",
      minimized: false,
      details: {
        description: "AWS Lambda functions for serverless background processing",
        lastRequest: "Invoke processPayment - 1 minute ago",
        responseTime: "200ms",
        successRate: "99.3%",
        uptime: "99.8%",
        errorCount: 3,
        endpoints: ["processPayment", "sendEmail", "generateReport"],
        payload: {
          functionName: "processPayment",
          event: { orderId: "ord_123", amount: 99.99 },
          response: { statusCode: 200, body: "Payment processed successfully" },
        },
      },
    },
    {
      id: "payment-gateway",
      label: "Payment Gateway",
      type: "payment",
      icon: <CreditCard className="w-5 h-5" />,
      position: { x: 600, y: 350 },
      status: "healthy",
      connections: [],
      size: "normal",
      minimized: false,
      details: {
        description: "Stripe payment gateway for processing transactions",
        lastRequest: "POST /charges - 30 seconds ago",
        responseTime: "250ms",
        successRate: "99.1%",
        uptime: "99.95%",
        errorCount: 2,
        endpoints: ["/charges", "/customers", "/subscriptions"],
        payload: {
          amount: 9999,
          currency: "usd",
          source: "tok_visa",
          description: "Order payment",
        },
      },
    },
    {
      id: "aws-cloudwatch",
      label: "AWS CloudWatch",
      type: "aws",
      icon: <FileText className="w-5 h-5" />,
      position: { x: 850, y: 300 },
      status: "healthy",
      connections: [],
      size: "normal",
      minimized: false,
      details: {
        description: "AWS CloudWatch for monitoring and logging application metrics",
        lastRequest: "PUT /metrics - 15 seconds ago",
        responseTime: "150ms",
        successRate: "99.7%",
        uptime: "99.99%",
        errorCount: 0,
        endpoints: ["/metrics", "/logs", "/alarms"],
        payload: {
          namespace: "MyApp",
          metricData: [
            { metricName: "RequestCount", value: 1, unit: "Count" },
            { metricName: "ResponseTime", value: 150, unit: "Milliseconds" },
          ],
        },
      },
    },
  ])

  const containerRef = useRef<HTMLDivElement>(null)

  const connections: FlowConnection[] = [
    { from: "angular-frontend", to: "nodejs-backend", label: "API Requests", active: false, delay: 0 },
    { from: "angular-frontend", to: "dotnet-backend", label: "API Calls", active: false, delay: 500 },
    { from: "nodejs-backend", to: "mysql-db", label: "Query Data", active: false, delay: 1000 },
    { from: "nodejs-backend", to: "redis-cache", label: "Cache Data", active: false, delay: 1200 },
    { from: "nodejs-backend", to: "aws-s3", label: "File Upload", active: false, delay: 1400 },
    { from: "dotnet-backend", to: "mysql-db", label: "Entity Framework", active: false, delay: 1600 },
    { from: "dotnet-backend", to: "payment-gateway", label: "Process Payment", active: false, delay: 1800 },
    { from: "dotnet-backend", to: "aws-lambda", label: "Trigger Function", active: false, delay: 2000 },
    { from: "aws-lambda", to: "aws-cloudwatch", label: "Log Metrics", active: false, delay: 2200 },
  ]

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    const newZoom = Math.max(0.5, Math.min(3, zoom + delta))
    setZoom(newZoom)
  }

  const handleMouseDown = (e: React.MouseEvent, nodeId?: string) => {
    if (e.target instanceof HTMLButtonElement) return

    if (nodeId) {
      const node = nodes.find((n) => n.id === nodeId)
      if (!node) return

      setDraggedNode(nodeId)
      setHasDragged(false)
      const rect = e.currentTarget.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    } else {
      setIsPanning(true)
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNode && containerRef.current) {
      setHasDragged(true)
      const containerRect = containerRef.current.getBoundingClientRect()
      const node = nodes.find((n) => n.id === draggedNode)
      if (!node) return

      const newX = (e.clientX - containerRect.left - dragOffset.x) / zoom - pan.x / zoom
      const newY = (e.clientY - containerRect.top - dragOffset.y) / zoom - pan.y / zoom

      setNodes((prev) =>
        prev.map((node) => (node.id === draggedNode ? { ...node, position: { x: newX, y: newY } } : node)),
      )
    } else if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setDraggedNode(null)
    setDragOffset({ x: 0, y: 0 })
    setIsPanning(false)
  }

  const handleNodeClick = (e: React.MouseEvent, node: FlowNode) => {
    if (e.target instanceof HTMLButtonElement) return
    if (hasDragged) return

    setSelectedNode(node)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2),
      )
      setZoom(distance / 200)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) + Math.pow(touch2.clientY - touch1.clientY, 2),
      )
      const newZoom = Math.max(0.5, Math.min(3, distance / 200))
      setZoom(newZoom)
    }
  }

  const toggleNodeSize = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === nodeId ? { ...node, size: node.size === "normal" ? "large" : "normal" } : node)),
    )
  }

  const toggleNodeMinimized = (nodeId: string) => {
    setNodes((prev) => prev.map((node) => (node.id === nodeId ? { ...node, minimized: !node.minimized } : node)))
  }

  const getNodeDimensions = (node: FlowNode) => {
    if (node.minimized) return { width: 60, height: 60 }
    if (node.size === "large") return { width: 240, height: 80 }
    return { width: 180, height: 60 }
  }

  const getNodeColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "border-teal-400 bg-teal-400/10"
      case "warning":
        return "border-orange-400 bg-orange-400/10"
      case "error":
        return "border-red-400 bg-red-400/10"
      default:
        return "border-border bg-card"
    }
  }

  const getNodeIconColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-teal-400"
      case "warning":
        return "text-orange-400"
      case "error":
        return "text-red-400"
      default:
        return "text-muted-foreground"
    }
  }

  useEffect(() => {
    if (!isPlaying) {
      setActiveConnections(new Set())
      setAnimationStep(0)
      return
    }

    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % connections.length)
    }, 800)

    return () => clearInterval(interval)
  }, [isPlaying])

  useEffect(() => {
    if (isPlaying) {
      const activeConnection = connections[animationStep]
      if (activeConnection) {
        setActiveConnections(new Set([`${activeConnection.from}-${activeConnection.to}`]))
      }
    }
  }, [animationStep, isPlaying])

  const renderConnection = (connection: FlowConnection) => {
    const fromNode = nodes.find((n) => n.id === connection.from)
    const toNode = nodes.find((n) => n.id === connection.to)

    if (!fromNode || !toNode) return null

    const isActive = activeConnections.has(`${connection.from}-${connection.to}`)

    const fromDimensions = getNodeDimensions(fromNode)
    const toDimensions = getNodeDimensions(toNode)

    const fromX = fromNode.position.x + fromDimensions.width
    const fromY = fromNode.position.y + fromDimensions.height / 2
    const toX = toNode.position.x
    const toY = toNode.position.y + toDimensions.height / 2

    return (
      <g key={`${connection.from}-${connection.to}`}>
        <line
          x1={fromX}
          y1={fromY}
          x2={toX}
          y2={toY}
          stroke={isActive ? "#14b8a6" : "#475569"}
          strokeWidth={isActive ? 3 : 2}
          strokeDasharray={isActive ? "0" : "5,5"}
        />

        <polygon
          points={`${toX - 8},${toY - 5} ${toX - 8},${toY + 5} ${toX},${toY}`}
          fill={isActive ? "#14b8a6" : "#475569"}
        />

        {isActive && (
          <text
            x={(fromX + toX) / 2}
            y={(fromY + toY) / 2 - 10}
            fill="#14b8a6"
            fontSize="12"
            textAnchor="middle"
            className="font-medium"
          >
            {connection.label}
          </text>
        )}

        {isActive && <circle cx={fromX + 20} cy={fromY} r="3" fill="#14b8a6" opacity="0.8" />}
      </g>
    )
  }

  const getSVGBounds = () => {
    if (nodes.length === 0) return { minX: 0, minY: 0, maxX: 2000, maxY: 1500 }

    let minX = Number.POSITIVE_INFINITY,
      minY = Number.POSITIVE_INFINITY,
      maxX = Number.NEGATIVE_INFINITY,
      maxY = Number.NEGATIVE_INFINITY

    nodes.forEach((node) => {
      const dimensions = getNodeDimensions(node)
      minX = Math.min(minX, node.position.x - 100)
      minY = Math.min(minY, node.position.y - 100)
      maxX = Math.max(maxX, node.position.x + dimensions.width + 100)
      maxY = Math.max(maxY, node.position.y + dimensions.height + 100)
    })

    return { minX, minY, maxX, maxY }
  }

  return (
    <>
      <div
        ref={containerRef}
        className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseDown={(e) => handleMouseDown(e)}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "radial-gradient(circle, hsl(var(--muted-foreground) / 0.2) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />

          <svg
            className="absolute pointer-events-none"
            style={{
              left: 0,
              top: 0,
              width: "2000px",
              height: "1500px",
            }}
            viewBox="0 0 2000 1500"
            preserveAspectRatio="none"
          >
            {connections.map(renderConnection)}
          </svg>

          {nodes.map((node) => {
            const dimensions = getNodeDimensions(node)
            return (
              <div
                key={node.id}
                className={`absolute flex items-center gap-3 px-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 cursor-pointer select-none group ${getNodeColor(node.status)} ${draggedNode === node.id ? "z-50 shadow-2xl" : "z-10"}`}
                style={{
                  left: node.position.x,
                  top: node.position.y,
                  width: dimensions.width,
                  height: dimensions.height,
                }}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                onClick={(e) => handleNodeClick(e, node)}
              >
                <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleNodeMinimized(node.id)
                    }}
                    className="p-1 rounded bg-muted hover:bg-muted/80 transition-colors"
                    title={node.minimized ? "Expand" : "Minimize"}
                  >
                    {node.minimized ? (
                      <Maximize2 className="w-3 h-3 text-muted-foreground" />
                    ) : (
                      <Minimize2 className="w-3 h-3 text-muted-foreground" />
                    )}
                  </button>
                  {!node.minimized && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleNodeSize(node.id)
                      }}
                      className="p-1 rounded bg-muted hover:bg-muted/80 transition-colors"
                      title={node.size === "normal" ? "Enlarge" : "Shrink"}
                    >
                      <div
                        className={`${node.size === "normal" ? "w-2 h-2" : "w-3 h-3"} border border-muted-foreground rounded-sm`}
                      />
                    </button>
                  )}
                </div>

                <div className={`${getNodeIconColor(node.status)} ${node.minimized ? "mx-auto" : ""}`}>{node.icon}</div>

                {!node.minimized && (
                  <div className="flex-1 min-w-0">
                    <div className={`font-medium text-foreground ${node.size === "large" ? "text-base" : "text-sm"}`}>
                      {node.label}
                    </div>
                    <div
                      className={`${getNodeIconColor(node.status)} ${node.size === "large" ? "text-sm" : "text-xs"}`}
                    >
                      {node.status === "healthy" ? "Online" : node.status === "warning" ? "Warning" : "Error"}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Flow Controls</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-teal-400"></div>
              <span className="text-muted-foreground">Active Data Flow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-muted-foreground border-dashed border-t"></div>
              <span className="text-muted-foreground">Available Connection</span>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <span className="text-muted-foreground text-xs">🖱️ Scroll to zoom</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">👆 Pinch to zoom (mobile)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">🖱️ Drag background to pan</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-xs">👆 Click node for details</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-xs">Zoom:</span>
              <span className="text-foreground text-xs font-mono">{Math.round(zoom * 100)}%</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Flow Statistics</h4>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Active Flows:</span>
              <span className="text-teal-400 font-medium">{isPlaying ? "1" : "0"}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Total Nodes:</span>
              <span className="text-foreground font-medium">{nodes.length}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Connections:</span>
              <span className="text-foreground font-medium">{connections.length}</span>
            </div>
          </div>
        </div>
      </div>

      <NodeDetailsPopup node={selectedNode} onClose={() => setSelectedNode(null)} />
    </>
  )
}
