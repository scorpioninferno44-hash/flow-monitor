"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Zap, BarChart3, GitBranch, AlertTriangle, Activity, ArrowRightLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navigationItems = [
  {
    title: "MONITORING",
    items: [
      { name: "Overview", href: "/overview", icon: BarChart3 },
      { name: "System Flow", href: "/system-flow", icon: GitBranch },
      { name: "Data Flow", href: "/data-flow", icon: ArrowRightLeft },
      { name: "Analytics", href: "/analytics", icon: Activity },
      { name: "Error Logs", href: "/error-logs", icon: AlertTriangle },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-black to-violet-600 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-sidebar-foreground font-medium">System Flow Monitor</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        {navigationItems.map((section) => (
          <div key={section.title} className="mb-6">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">{section.title}</h3>
            <nav className="space-y-1">
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* System Status */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="w-4 h-4 text-teal-400" />
            <span className="text-sm font-medium text-sidebar-foreground">System Status</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Uptime</span>
              <span className="text-xs text-teal-400 font-medium">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Active Nodes</span>
              <span className="text-xs text-sidebar-foreground font-medium">8/8</span>
            </div>
          </div>
        </div>

        <ThemeToggle />
      </div>
    </div>
  )
}
