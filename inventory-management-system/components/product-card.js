"use client"

import { Package, Edit, Database } from "lucide-react"

export function ProductCard({ product, onEdit, onOpenRecords }) {
  const availabilityPercentage =
    product.masterCount > 0
      ? Math.round((product.availability / product.masterCount) * 100)
      : 0

  const getAvailabilityColor = () => {
    if (availabilityPercentage >= 70) return "bg-green-500"
    if (availabilityPercentage >= 30) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div
      className="flex flex-col rounded-lg border bg-card shadow-sm"
      style={{ border: "2px solid oklch(24.571% 0.12604 288.685)" }}
    >
      <div className="flex flex-col space-y-1.5 p-6 pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-muted">
              <Package className="w-5 h-5 text-muted-foreground" />
            </div>
            <h3 className="font-semibold leading-none tracking-tight text-lg line-clamp-1">{product.name}</h3>
          </div>
          <div className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border text-foreground shrink-0">
            {availabilityPercentage}% available
          </div>
        </div>
      </div>

      <div className="p-6 pt-0 flex-1 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Master Count</p>
            <p className="text-2xl font-semibold">{product.masterCount}</p>
            <p className="text-xs text-muted-foreground">Total quantity owned</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Availability</p>
            <p className="text-2xl font-semibold">{product.availability}</p>
            <p className="text-xs text-muted-foreground">Usable quantity</p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Stock Level</span>
            <span>
              {product.availability} / {product.masterCount}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${getAvailabilityColor()}`}
              style={{ width: `${availabilityPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center p-6 pt-0 gap-2">
        <button
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 h-9 px-4 py-2 border bg-background hover:bg-accent hover:text-accent-foreground bg-transparent"
          onClick={() => onEdit(product)}
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50 h-9 px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
          onClick={() => onOpenRecords(product)}
        >
          <Database className="w-4 h-4 mr-2" />
          Records
        </button>
      </div>
    </div>
  )
}
