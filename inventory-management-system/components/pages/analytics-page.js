
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { useInventory } from "@/lib/inventory-context"
import {
  BarChart3,
  Package,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ShoppingCart,
  Download,
  Activity,
  Users,
  Target,
  BarChart4,
  PieChart,
  Layers,
  ChevronRight,
  Sparkles,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  LineChart,
  RefreshCw,
} from "lucide-react"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border px-2.5 py-1 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1.5 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 transition-all duration-200 overflow-hidden group",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white shadow-sm hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-input bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",
        success:
          "border-transparent bg-emerald-500 text-white shadow-sm hover:bg-emerald-600",
        warning:
          "border-transparent bg-amber-500 text-white shadow-sm hover:bg-amber-600",
        info:
          "border-transparent bg-blue-500 text-white shadow-sm hover:bg-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

function Badge({ className, variant, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md",
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function Table({ className, ...props }) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto rounded-lg border"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 px-4 text-left align-middle font-medium text-muted-foreground whitespace-nowrap [&:has([role=checkbox])]:pr-0 *:[[role=checkbox]]:translate-y-0.5",
        className,
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }) {
  return (
    <td
      data-slot="table-cell"
      className={cn("p-4 align-middle", className)}
      {...props}
    />
  )
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export function AnalyticsPage() {
  const { products, borrowRecords, getMonthlyReport, refreshData } = useInventory()
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refreshData()
    } finally {
      setTimeout(() => setIsRefreshing(false), 500)
    }
  }

  const monthlyData = getMonthlyReport()

  const totalMasterCount = products.reduce(
    (s, p) => s + p.masterCount,
    0,
  )
  const totalAvailability = products.reduce(
    (s, p) => s + p.availability,
    0,
  )

  const totalBorrowed = borrowRecords
    .filter((r) => r.type === "borrow")
    .reduce((s, r) => s + r.quantity, 0)

  const totalPurchased = borrowRecords
    .filter((r) => r.type === "purchase")
    .reduce((s, r) => s + r.quantity, 0)

  const utilizationRate = totalMasterCount
    ? Math.round(
        ((totalMasterCount - totalAvailability) / totalMasterCount) * 100,
      )
    : 0

  // Calculate additional metrics
  const avgUtilization = products.length > 0 
    ? products.reduce((acc, p) => {
        const rate = p.masterCount > 0 
          ? ((p.masterCount - p.availability) / p.masterCount) * 100 
          : 0
        return acc + rate
      }, 0) / products.length
    : 0

  const lowStockProducts = products.filter(
    (p) => p.masterCount > 0 && p.availability / p.masterCount < 0.3
  )

  const downloadMonthlyReport = (month) => {
    const m = monthlyData.find((x) => x.month === month)
    if (!m) return

    const csv = [
      ["Month", month],
      ["Opening Stock", m.openingStock],
      ["Closing Stock", m.closingStock],
      ["Purchased", m.newlyPurchased],
      ["Defective", m.defectiveRemoved],
    ]
      .map((r) => r.join(","))
      .join("\n")

    const a = document.createElement("a")
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
    a.download = `Analytics-${month}.csv`
    a.click()
  }

  const downloadAllMonthsReport = () => {
    if (monthlyData.length === 0) return

    const csv = [
      ["Month", "Opening Stock", "Closing Stock", "Purchased", "Defective"],
      ...monthlyData.map((m) => [
        m.month,
        m.openingStock,
        m.closingStock,
        m.newlyPurchased,
        m.defectiveRemoved,
      ]),
    ]
      .map((r) => r.join(","))
      .join("\n")

    const a = document.createElement("a")
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
    a.download = `Analytics-All-Months.csv`
    a.click()
  }

  // Calculate monthly growth
  const calculateGrowth = () => {
    if (monthlyData.length < 2) return 0
    const lastMonth = monthlyData[monthlyData.length - 1]
    const prevMonth = monthlyData[monthlyData.length - 2]
    const growth = ((lastMonth.closingStock - prevMonth.closingStock) / prevMonth.closingStock) * 100
    return growth.toFixed(1)
  }

  return (
    <div className="space-y-8 p-4 animate-in fade-in duration-500">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5 dark:opacity-[0.02]"></div>
      </div>

      {/* Header Section */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive insights and performance metrics
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Utilization Rate</p>
                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">{utilizationRate}%</p>
                  {utilizationRate > 70 && (
                    <Badge variant="success" className="text-xs">
                      <TrendingUp className="h-3 w-3" />
                      High
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                <TrendingUp className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Opening Stock</p>
                <p className="text-2xl font-bold">{totalMasterCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950/30 dark:to-slate-900/20 border border-slate-200 dark:border-slate-800/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-slate-100 dark:bg-slate-900/30 rounded-lg">
                <TrendingDown className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Closing Stock</p>
                <p className="text-2xl font-bold">{totalAvailability}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Analytics */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Transaction Analytics</CardTitle>
              <Badge variant="outline">
                <LineChart className="h-3 w-3" />
                30 Days
              </Badge>
            </div>
            <CardDescription>Total borrow and purchase activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Borrowed</p>
                      <p className="text-2xl font-bold">{totalBorrowed}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totalBorrowed / (totalMasterCount || 1)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                      <ShoppingCart className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total Purchased</p>
                      <p className="text-2xl font-bold">{totalPurchased}</p>
                    </div>
                  </div>
                  <div className="h-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totalPurchased / (totalMasterCount || 1)) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Indicator */}
            {monthlyData.length >= 2 && (
              <div className="mt-6 p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <p className="font-medium">Monthly Growth</p>
                  <Badge variant={calculateGrowth() > 0 ? "success" : "warning"}>
                    {calculateGrowth() > 0 ? '+' : ''}{calculateGrowth()}%
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  {monthlyData.slice(-6).map((month, index) => (
                    <div key={month.month} className="flex-1">
                      <div className="text-xs text-muted-foreground mb-1 truncate">
                        {month.month.slice(0, 3)}
                      </div>
                      <div className="h-24 flex items-end">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                          style={{ 
                            height: `${(month.closingStock / Math.max(...monthlyData.slice(-6).map(m => m.closingStock))) * 100}%`,
                            maxHeight: '100%'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Low Stock Alerts</CardTitle>
              {lowStockProducts.length > 0 && (
                <Badge variant="destructive">
                  <AlertTriangle className="h-3 w-3" />
                  {lowStockProducts.length}
                </Badge>
              )}
            </div>
            <CardDescription>Products below 30% availability</CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4">
                  <CheckCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm text-muted-foreground">All products are well-stocked</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.slice(0, 5).map((product) => {
                  const percentage = Math.round((product.availability / product.masterCount) * 100)
                  return (
                    <div
                      key={product.id}
                      className="p-3 border rounded-lg hover:border-amber-300 dark:hover:border-amber-700 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <Badge variant="destructive" className="text-xs">
                          {product.availability}/{product.masterCount}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Stock Level</span>
                          <span className="font-medium">{percentage}%</span>
                        </div>
                        <div className="h-2 bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )
                })}
                {lowStockProducts.length > 5 && (
                  <Button variant="ghost" size="sm" className="w-full">
                    View All {lowStockProducts.length} Items
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Monthly Reports */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Monthly Reports</CardTitle>
              <CardDescription>Detailed inventory analytics by month</CardDescription>
            </div>
            {monthlyData.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={downloadAllMonthsReport}
                >
                  <Download className="h-4 w-4" />
                  Export All
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {monthlyData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="p-4 bg-muted rounded-full mb-4">
                <BarChart3 className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No monthly data available yet</p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Reports will appear as data accumulates
              </p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Month</TableHead>
                    <TableHead className="text-right">Opening</TableHead>
                    <TableHead className="text-right">Closing</TableHead>
                    <TableHead className="text-right">Purchased</TableHead>
                    <TableHead className="text-right">Defective</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {monthlyData.map((m) => (
                    <TableRow key={m.month}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary"></div>
                          {m.month}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {m.openingStock == null ? "-" : m.openingStock}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-medium">
                            {m.closingStock == null ? "-" : m.closingStock}
                          </span>
                          {m.closingStock != null && m.openingStock != null ? (
                            m.closingStock > m.openingStock ? (
                              <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            ) : m.closingStock < m.openingStock ? (
                              <ArrowDownRight className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            ) : null
                          ) : null}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                          {m.newlyPurchased == null ? "-" : `+${m.newlyPurchased}`}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-amber-600 dark:text-amber-400 font-medium">
                          {m.defectiveRemoved == null ? "-" : `-${m.defectiveRemoved}`}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => downloadMonthlyReport(m.month)}
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Average Utilization</p>
                  <p className="text-2xl font-bold">{avgUtilization.toFixed(1)}%</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Monthly Growth</p>
                  <p className="text-2xl font-bold flex items-center justify-center gap-1">
                    {calculateGrowth() > 0 ? '+' : ''}{calculateGrowth()}%
                    {calculateGrowth() > 0 ? (
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-amber-600" />
                    )}
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Attention Needed</p>
                  <p className="text-2xl font-bold">{lowStockProducts.length}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Target className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Stock Efficiency</p>
              <p className="text-lg font-semibold">
                {totalMasterCount > 0 
                  ? Math.round((totalAvailability / totalMasterCount) * 100) 
                  : 0}%
              </p>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
              <Activity className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Activity Rate</p>
              <p className="text-lg font-semibold">
                {totalBorrowed + totalPurchased}
              </p>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Critical Items</p>
              <p className="text-lg font-semibold">{lowStockProducts.length}</p>
            </div>
          </div>
        </div>

        <div className="border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-100 dark:bg-slate-900/30 rounded-lg">
              <BarChart4 className="h-5 w-5 text-slate-600 dark:text-slate-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reports Generated</p>
              <p className="text-lg font-semibold">{monthlyData.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation-name: enter;
          animation-duration: 150ms;
          animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Modern scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        
        ::-webkit-scrollbar-thumb {
          background: hsl(var(--muted-foreground) / 0.2);
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: hsl(var(--muted-foreground) / 0.3);
        }
        
        /* Smooth transitions */
        * {
          transition: background-color 0.2s ease, 
                      border-color 0.2s ease, 
                      color 0.2s ease;
        }
        
        /* Focus styles */
        :focus-visible {
          outline: 2px solid hsl(var(--ring));
          outline-offset: 2px;
        }
        
        /* Selection */
        ::selection {
          background: hsl(var(--primary) / 0.2);
          color: hsl(var(--primary-foreground));
        }
      `}</style>
    </div>
  )
}
