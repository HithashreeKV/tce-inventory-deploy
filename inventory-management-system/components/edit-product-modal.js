"use client"

import { useState } from "react"
import { useInventory } from "@/lib/inventory-context"
import { Plus, Minus, Trash2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as TabsPrimitive from '@radix-ui/react-tabs'

function Dialog({ children, ...props }) { return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root> }
function DialogContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
      <DialogPrimitive.Content className={cn('fixed top-1/2 left-1/2 z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-background border rounded-lg p-6 shadow-lg', className)} {...props}>
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 opacity-70 transition-opacity hover:opacity-100">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
function DialogHeader({ className, ...props }) { return <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} /> }
function DialogTitle({ className, ...props }) { return <DialogPrimitive.Title className={cn('text-lg font-semibold', className)} {...props} /> }
function DialogDescription({ className, ...props }) { return <DialogPrimitive.Description className={cn('text-sm text-muted-foreground', className)} {...props} /> }

function Tabs({ className, ...props }) { return <TabsPrimitive.Root className={cn('flex flex-col', className)} {...props} /> }
function TabsList({ className, ...props }) { return <TabsPrimitive.List className={cn('inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground', className)} {...props} /> }
function TabsTrigger({ className, ...props }) {
  return (
    <TabsPrimitive.Trigger
      className={cn('inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm', className)}
      {...props}
    />
  )
}
function TabsContent({ className, ...props }) { return <TabsPrimitive.Content className={cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)} {...props} /> }

function Label({ className, ...props }) {
  return <label className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)} {...props} />
}

function Input({ className, type, ...props }) {
  return <input type={type} className={cn('h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm border-input focus-visible:ring-2 focus-visible:ring-ring', className)} {...props} />
}

function Button({ className, variant = "default", size = "default", ...props }) {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-white hover:bg-destructive/90',
  }
  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 px-3',
  }
  return <button className={cn('inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50', variants[variant], sizes[size], className)} {...props} />
}

export function EditProductModal({ product, open, onOpenChange }) {
  const { addPurchasedItems, markDefective, deleteProduct } = useInventory()

  const [purchaseQuantity, setPurchaseQuantity] = useState("")
  const [defectiveQuantity, setDefectiveQuantity] = useState("")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  if (!product) return null

  const handleAddPurchased = () => {
    const quantity = parseInt(purchaseQuantity)
    if (quantity > 0) {
      addPurchasedItems(product.id, quantity)
      setPurchaseQuantity("")
    }
  }

  const handleMarkDefective = () => {
    const quantity = parseInt(defectiveQuantity)
    if (quantity > 0 && quantity <= product.availability) {
      markDefective(product.id, quantity)
      setDefectiveQuantity("")
    }
  }

  const handleDelete = () => {
    deleteProduct(product.id)
    setShowDeleteConfirm(false)
    onOpenChange(false)
  }

  const handleClose = () => {
    setPurchaseQuantity("")
    setDefectiveQuantity("")
    setShowDeleteConfirm(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Manage {product.name} - Master: {product.masterCount}, Available: {product.availability}
          </DialogDescription>
        </DialogHeader>

        {showDeleteConfirm ? (
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to permanently delete <strong>{product.name}</strong>? This action cannot be undone and will also remove all associated borrow/purchase records.
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete Permanently
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Tabs defaultValue="purchase" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="purchase">Add Purchased</TabsTrigger>
                <TabsTrigger value="defective">Mark Defective</TabsTrigger>
              </TabsList>

              <TabsContent value="purchase" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="purchaseQty">Quantity to Add</Label>
                  <p className="text-xs text-muted-foreground">
                    Add newly purchased items to increase master count and availability
                  </p>
                  <div className="flex gap-2">
                    <Input
                      id="purchaseQty"
                      type="number"
                      min="1"
                      placeholder="Enter quantity"
                      value={purchaseQuantity}
                      onChange={(e) => setPurchaseQuantity(e.target.value)}
                    />
                    <Button
                      onClick={handleAddPurchased}
                      disabled={!purchaseQuantity || parseInt(purchaseQuantity) <= 0}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="defective" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="defectiveQty">Defective Quantity</Label>
                  <p className="text-xs text-muted-foreground">
                    Mark items as defective to decrease availability (max: {product.availability})
                  </p>
                  <div className="flex gap-2">
                    <Input
                      id="defectiveQty"
                      type="number"
                      min="1"
                      max={product.availability}
                      placeholder="Enter quantity"
                      value={defectiveQuantity}
                      onChange={(e) => setDefectiveQuantity(e.target.value)}
                    />
                    <Button
                      variant="secondary"
                      onClick={handleMarkDefective}
                      disabled={
                        !defectiveQuantity ||
                        parseInt(defectiveQuantity) <= 0 ||
                        parseInt(defectiveQuantity) > product.availability
                      }
                    >
                      <Minus className="w-4 h-4 mr-2" />
                      Mark
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 mt-6">
              <Button variant="destructive" className="w-full sm:w-auto" onClick={() => setShowDeleteConfirm(true)}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Product
              </Button>
              <Button variant="outline" className="w-full sm:w-auto" onClick={handleClose}>
                Close
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
