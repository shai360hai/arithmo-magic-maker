import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Trash2, Plus, Printer, Download, CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { he } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

interface Customer {
  name: string;
  address: string;
  phone: string;
}

interface PaymentMethod {
  cash: boolean;
  check: boolean;
  bit: boolean;
  bankTransfer: boolean;
}

const InvoiceGenerator = () => {
  const [customer, setCustomer] = useState<Customer>({ name: '', address: '', phone: '' });
  const [items, setItems] = useState<InvoiceItem[]>([{ id: '1', description: '', quantity: 1, price: 0 }]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    cash: false,
    check: false,
    bit: false,
    bankTransfer: false
  });
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date());

  // Add new item
  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, price: 0 }]);
  };

  // Remove item
  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Update item
  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  // Calculate total
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  // Print invoice
  const handlePrint = () => {
    window.print();
  };

  // Download invoice as PDF (simple print-to-PDF)
  const handleDownload = () => {
    handlePrint();
  };

  return (
    <Card className={cn("mb-6 shadow-xl max-w-4xl mx-auto print:w-full print:shadow-none print:border-none")}>
      <CardHeader>
        <CardTitle className="text-3xl text-center text-primary font-bold tracking-tight mb-2">
          מחולל חשבוניות
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="space-y-10 bg-gradient-to-b from-gray-50 to-white rounded-xl p-8 print:bg-white print:p-0">

        {/* Invoice Details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
          <div>
            <Label htmlFor="invoiceNumber" className="font-semibold text-lg mb-2 block">מספר חשבונית</Label>
            <Input
              id="invoiceNumber"
              value={invoiceNumber}
              onChange={e => setInvoiceNumber(e.target.value)}
              placeholder="לדוג' 1002"
              className="mb-4"
            />
          </div>
          <div>
            <Label className="font-semibold text-lg mb-2 block">תאריך</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full flex justify-between">
                  <span>
                    {invoiceDate ? format(invoiceDate, "dd/MM/yyyy", { locale: he }) : "בחר תאריך"}
                  </span>
                  <CalendarIcon className="ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  selected={invoiceDate}
                  onSelect={setInvoiceDate}
                  locale={he}
                />
              </PopoverContent>
            </Popover>
          </div>
        </section>

        <Separator />

        {/* Customer Details */}
        <section>
          <h3 className="text-lg font-semibold mb-4">פרטי לקוח</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="customerName">שם</Label>
              <Input
                id="customerName"
                value={customer.name}
                onChange={e => setCustomer({ ...customer, name: e.target.value })}
                placeholder="שם הלקוח"
              />
            </div>
            <div>
              <Label htmlFor="customerAddress">כתובת</Label>
              <Input
                id="customerAddress"
                value={customer.address}
                onChange={e => setCustomer({ ...customer, address: e.target.value })}
                placeholder="כתובת"
              />
            </div>
            <div>
              <Label htmlFor="customerPhone">טלפון</Label>
              <Input
                id="customerPhone"
                value={customer.phone}
                onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                placeholder="טלפון"
              />
            </div>
          </div>
        </section>

        <Separator />

        {/* Items Table */}
        <section>
          <h3 className="text-lg font-semibold mb-4">פרטי חשבונית</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full border rounded-lg bg-white print:w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-right">#</th>
                  <th className="p-2 text-right">תיאור</th>
                  <th className="p-2 text-right">כמות</th>
                  <th className="p-2 text-right">מחיר ליחידה</th>
                  <th className="p-2 text-right">סך הכל</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-2 text-right">{idx + 1}</td>
                    <td className="p-2 text-right">
                      <Input
                        value={item.description}
                        onChange={e => updateItem(item.id, 'description', e.target.value)}
                        placeholder="תיאור פריט"
                        className="min-w-[120px]"
                      />
                    </td>
                    <td className="p-2 text-right">
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={e => updateItem(item.id, 'quantity', Math.max(1, Number(e.target.value)))}
                        className="w-24"
                      />
                    </td>
                    <td className="p-2 text-right">
                      <Input
                        type="number"
                        min={0}
                        value={item.price}
                        onChange={e => updateItem(item.id, 'price', Math.max(0, Number(e.target.value)))}
                        className="w-24"
                      />
                    </td>
                    <td className="p-2 text-right font-semibold">
                      {(item.quantity * item.price).toLocaleString('he-IL', { style: 'currency', currency: 'ILS' })}
                    </td>
                    <td className="p-2">
                      {items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          title="הסר פריט"
                          className="text-red-600"
                        >
                          <Trash2 size={18} />
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              variant="outline"
              className="mt-4 flex items-center gap-2"
              onClick={addItem}
            >
              <Plus size={16} /> הוסף פריט
            </Button>
          </div>
        </section>

        <Separator />

        {/* Total */}
        <section className="flex justify-end items-center mb-2">
          <span className="text-2xl font-bold text-primary">
            סך הכל: {calculateTotal().toLocaleString('he-IL', { style: 'currency', currency: 'ILS' })}
          </span>
        </section>

        <Separator />

        {/* Payment Methods */}
        <section>
          <h3 className="text-lg font-semibold mb-4">אמצעי תשלום</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'מזומן', name: 'cash' },
              { label: 'צ\'ק', name: 'check' },
              { label: 'ביט', name: 'bit' },
              { label: 'העברה בנקאית', name: 'bankTransfer' },
            ].map(pm => (
              <Label key={pm.name} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={paymentMethod[pm.name as keyof PaymentMethod]}
                  onCheckedChange={checked => setPaymentMethod({ ...paymentMethod, [pm.name]: checked as boolean })}
                />
                {pm.label}
              </Label>
            ))}
          </div>
        </section>

        <Separator />

        {/* Actions */}
        <section className="flex flex-wrap gap-4 justify-center print:hidden">
          <Button variant="default" size="lg" onClick={handlePrint} className="flex items-center gap-2">
            <Printer size={18} /> הדפס
          </Button>
          <Button variant="outline" size="lg" onClick={handleDownload} className="flex items-center gap-2">
            <Download size={18} /> שמור PDF
          </Button>
        </section>
      </CardContent>
    </Card>
  );
};

export default InvoiceGenerator;
