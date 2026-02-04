"use client"

import React, { useState } from "react"
import { useInventory } from '@/lib/inventory-context'
import { Plus, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import * as SelectPrimitive from '@radix-ui/react-select'

function Dialog({ children, ...props }) { return <DialogPrimitive.Root {...props}>{children}</DialogPrimitive.Root> }
function DialogContent({ className, children, ...props }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50" />
      <DialogPrimitive.Content className={cn('fixed top-1/2 left-1/2 z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] bg-background border rounded-lg p-6 shadow-lg max-h-[90vh] overflow-y-auto', className)} {...props}>
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

function Table({ className, ...props }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full text-sm", className)} {...props} />
    </div>
  )
}
const TableHeader = (props) => <thead {...props} />
const TableBody = (props) => <tbody {...props} />
function TableRow({ className, ...props }) {
  return <tr className={cn("border-b hover:bg-muted/50 transition", className)} {...props} />
}
function TableHead({ className, ...props }) {
  return <th className={cn("px-2 h-10 text-left font-medium", className)} {...props} />
}
function TableCell({ className, ...props }) {
  return <td className={cn("px-2 py-2", className)} {...props} />
}

function Badge({ className, variant = "default", ...props }) {
  const variants = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
  }
  return <div className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border", variants[variant], className)} {...props} />
}

function Label({ className, ...props }) {
  return <label className={cn('text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', className)} {...props} />
}

function Input({ className, type, ...props }) {
  return <input type={type} className={cn('h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm border-input focus-visible:ring-2 focus-visible:ring-ring', className)} {...props} />
}

function Select({ value, onValueChange, children, ...props }) {
  return <SelectPrimitive.Root value={value} onValueChange={onValueChange} {...props}>{children}</SelectPrimitive.Root>
}
function SelectTrigger({ className, children, ...props }) {
  return (
    <SelectPrimitive.Trigger
      className={cn('flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1', className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}
function SelectContent({ className, ...props }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        position="popper"
        sideOffset={4}
        className={cn('z-[70] max-h-96 min-w-[8rem] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-md border bg-white text-gray-900 shadow-lg ring-1 ring-black/5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', className)}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">
          {props.children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}
function SelectItem({ className, ...props }) {
  return (
    <SelectPrimitive.Item
      className={cn('relative flex w-full cursor-pointer select-none items-center rounded-sm bg-white py-1.5 pl-8 pr-2 text-sm text-gray-900 outline-none data-[highlighted]:bg-indigo-50 data-[highlighted]:text-indigo-900 data-[state=checked]:bg-indigo-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Check className="h-4 w-4 text-indigo-600" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText className="text-gray-900" />
    </SelectPrimitive.Item>
  )
}
function SelectValue(props) {
  return <SelectPrimitive.Value {...props} />
}

function Button({ className, variant = "default", size = "default", ...props }) {
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  }
  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-8 px-3',
  }
  return <button className={cn('inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all disabled:opacity-50', variants[variant], sizes[size], className)} {...props} />
}

const Check = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="20 6 9 17 4 12"></polyline></svg>

export function BorrowRecordsModal({ product, open, onOpenChange }) {
  const { getProductRecords, addBorrowRecord, deleteBorrowRecord, returnProduct, fetchTransactions } = useInventory()
  const [returnedRecords, setReturnedRecords] = useState(new Set())

  const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const [studentName, setStudentName] = useState('')
  const [usn, setUsn] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [section, setSection] = useState('')
  const [takenDate, setTakenDate] = useState(getTodayDate())
  const [returnDate, setReturnDate] = useState('')
  const [recordType, setRecordType] = useState('borrow')
  const [quantity, setQuantity] = useState('1')
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('records')
  const [isSubmitting, setIsSubmitting] = useState(false)

  React.useEffect(() => {
    if (open && activeTab === 'records') {
      fetchTransactions()
    }
  }, [open, activeTab, fetchTransactions])

  if (!product) return null

  const records = getProductRecords(product.id)

  const resetForm = () => {
    setStudentName('')
    setUsn('')
    setPhoneNumber('')
    setSection('')
    setTakenDate(getTodayDate())
    setReturnDate('')
    setRecordType('borrow')
    setQuantity('1')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!studentName.trim() || !usn.trim() || !phoneNumber.trim() || !section.trim() || !takenDate) {
      setError('Please fill in all required fields')
      return
    }

    if (usn.trim().length !== 10) {
      setError('USN must be exactly 10 characters')
      return
    }

    if (phoneNumber.trim().length !== 10) {
      setError('Phone number must be exactly 10 digits')
      return
    }

    if (returnDate && returnDate <= takenDate) {
      setError('Return date must be greater than taken date')
      return
    }

    const qty = parseInt(quantity)
    if (qty <= 0) {
      setError('Quantity must be at least 1')
      return
    }

    if (recordType === 'borrow' && qty > product.availability) {
      setError(`Not enough available stock. Maximum: ${product.availability}`)
      return
    }

    if (recordType === 'purchase' && qty > product.masterCount) {
      setError(`Not enough stock. Maximum: ${product.masterCount}`)
      return
    }

    setIsSubmitting(true)
    const success = await addBorrowRecord({
      productId: product.id,
      studentName: studentName.trim(),
      usn: usn.trim().toUpperCase(),
      phoneNumber: phoneNumber.trim(),
      section: section.trim().toUpperCase(),
      takenDate,
      returnDate: returnDate || '',
      type: recordType,
      quantity: qty,
    })
    setIsSubmitting(false)

    if (success) {
      resetForm()
      setActiveTab('records')
    } else {
      setError('Failed to add record. Please try again.')
    }
  }

  const handleClose = () => {
    resetForm()
    onOpenChange(false)
  }

  const handleDeleteRecord = async (recordId) => {
    const confirmDelete = window.confirm('Delete this record? This action cannot be undone.')
    if (!confirmDelete) return

    await deleteBorrowRecord(recordId)
  }

  const handleReturnProduct = async (recordId) => {
    const confirmReturn = window.confirm('Mark this item as returned?')
    if (!confirmReturn) return

    const success = await returnProduct(recordId)
    if (success) {
      setReturnedRecords(prev => new Set([...prev, recordId]))
      await fetchTransactions()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Borrow / Purchase Database</DialogTitle>
          <DialogDescription>
            {product.name} - Available: {product.availability} / Master: {product.masterCount}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="records">View Records</TabsTrigger>
            <TabsTrigger value="add">Add New Entry</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="mt-4">
            {records.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No records found for this product
              </div>
            ) : (
              <div className="border rounded-md overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>USN</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Section</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Taken</TableHead>
                      <TableHead>Return</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {records.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="font-medium">{record.studentName}</TableCell>
                        <TableCell>{record.usn}</TableCell>
                        <TableCell>{record.phoneNumber}</TableCell>
                        <TableCell>{record.section}</TableCell>
                        <TableCell>
                          <Badge variant={record.type === 'borrow' ? 'secondary' : 'default'}>
                            {record.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{record.quantity}</TableCell>
                        <TableCell>{record.takenDate}</TableCell>
                        <TableCell>{record.returnDate || '-'}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {record.type === 'borrow' && !returnedRecords.has(record.id) && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="text-green-600 border-green-600/40 hover:bg-green-600/10"
                                onClick={() => handleReturnProduct(record.id)}
                              >
                                Return
                              </Button>
                            )}
                            {record.type === 'borrow' && returnedRecords.has(record.id) && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                disabled
                                className="text-emerald-600 border-emerald-600/40 bg-emerald-50 dark:bg-emerald-950/20"
                              >
                                ✓ Returned
                              </Button>
                            )}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              className="text-destructive border-destructive/40 hover:bg-destructive/10"
                              onClick={() => handleDeleteRecord(record.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent value="add" className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentName">Student Name *</Label>
                  <Input
                    id="studentName"
                    placeholder="Enter student name"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usn">USN *</Label>
                  <Input
                    id="usn"
                    placeholder="e.g., 1MS21CS001"
                    value={usn}
                    maxLength={10}
                    onChange={(e) => setUsn(e.target.value.slice(0, 10))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number * </Label>
                  <Input
                    id="phoneNumber"
                    placeholder="e.g., 9876543210"
                    type="tel"
                    value={phoneNumber}
                    maxLength={10}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="section">Section *</Label>
                  <Input
                    id="section"
                    placeholder="e.g., A"
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recordType">Type *</Label>
                  <select
                    id="recordType"
                    value={recordType}
                    onChange={(e) => setRecordType(e.target.value)}
                    className="h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="borrow">Borrow </option>
                    <option value="purchase">Purchase</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={recordType === 'borrow' ? product.availability : product.masterCount}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="takenDate">Taken Date *</Label>
                  <Input
                    id="takenDate"
                    type="date"
                    value={takenDate}
                    onChange={(e) => setTakenDate(e.target.value)}
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="returnDate">Return Date</Label>
                  <Input
                    id="returnDate"
                    type="date"
                    min={takenDate}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                 
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                <Plus className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Adding...' : 'Add Entry'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
