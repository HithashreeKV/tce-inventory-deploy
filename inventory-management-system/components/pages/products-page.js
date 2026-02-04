"use client"

import * as React from "react"
import { useState } from "react"
import { useInventory } from "@/lib/inventory-context"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ProductCard } from "@/components/product-card"
import { EditProductModal } from "@/components/edit-product-modal"
import { BorrowRecordsModal } from "@/components/borrow-records-modal"
import { AddProductModal } from "@/components/add-product-modal"
import { Plus, Package } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link:
          "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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

export function ProductsPage() {
  const { filteredProducts, searchQuery } = useInventory()

  const [editProduct, setEditProduct] = useState(null)
  const [recordsProduct, setRecordsProduct] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "oklch(24.571% 0.12604 288.685)" }}
          >
            Products
          </h1>
          <p className="text-muted-foreground">
            {searchQuery
              ? `Showing ${filteredProducts.length} results for "${searchQuery}"`
              : `Manage your inventory of ${filteredProducts.length} products`}
          </p>
        </div>

        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">No products found</h3>
          <p className="mt-1 max-w-sm text-muted-foreground">
            {searchQuery
              ? `No products match "${searchQuery}". Try a different search term.`
              : "Get started by adding your first product to the inventory."}
          </p>

          {!searchQuery && (
            <Button
              className="mt-4"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Product
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={setEditProduct}
              onOpenRecords={setRecordsProduct}
            />
          ))}
        </div>
      )}

      <EditProductModal
        product={editProduct}
        open={editProduct !== null}
        onOpenChange={(open) => !open && setEditProduct(null)}
      />

      <BorrowRecordsModal
        product={recordsProduct}
        open={recordsProduct !== null}
        onOpenChange={(open) => !open && setRecordsProduct(null)}
      />

      <AddProductModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
      />
    </div>
  )
}


