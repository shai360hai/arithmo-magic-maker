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
  const [customer, setCustomer] = useState<Customer>({
    name: '',
    address: '',
    phone: ''
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: '', quantity: 1, price: 0 }
  ]);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    cash: false,
    check: false,
    bit: false,
    bankTransfer: false
  });

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date());

  const addItem = () => {
    setItems([...items, { 
      id: Date.now().toString(), 
      description: '', 
      quantity: 1, 
      price: 0 
    }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
   <div className="pastry-container">
      <img src="/images/logo.jpeg" alt="logo" className="logo" />
      <img src="/images/mixer.png" alt="מיקסר" className="mixer" />

      <div className="contact">
        <div className="icons">
          <a href="tel:0506897798">
            <img
              src="https://img.icons8.com/ios-filled/50/000000/phone.png"
              alt="Call"
            />
          </a>
          <a href="https://wa.me/972506897798" target="_blank" rel="noreferrer">
            050-6897798
          </a>
        </div>

        <div className="instagram">
          <a
            href="https://www.instagram.com/haisasonker"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://img.icons8.com/ios-filled/50/000000/instagram-new.png"
              alt="Instagram"
            />
            @haisasonker
          </a>
        </div>
      </div>
    </div>
  


        {/* Invoice Form */}
        <Card className="mb-6 shadow-soft">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">
              מחולל חשבוניות
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Invoice Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="invoiceNumber">מספר חשבונית</Label>
                <Input
                  id="invoiceNumber"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  className="text-right"
                  placeholder="הכנס מספר חשבונית"
                />
              </div>
              <div>
                <Label htmlFor="invoiceDate">תאריך</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-right font-normal",
                        !invoiceDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      {invoiceDate ? format(invoiceDate, "dd/MM/yyyy", { locale: he }) : "בחר תאריך"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={invoiceDate}
                      onSelect={setInvoiceDate}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">פרטי לקוח</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="customerName">שם לקוח</Label>
                  <Input
                    id="customerName"
                    value={customer.name}
                    onChange={(e) => setCustomer({...customer, name: e.target.value})}
                    className="text-right"
                    placeholder="הכנס שם לקוח"
                  />
                </div>
                <div>
                  <Label htmlFor="customerPhone">טלפון</Label>
                  <Input
                    id="customerPhone"
                    value={customer.phone}
                    onChange={(e) => setCustomer({...customer, phone: e.target.value})}
                    className="text-right"
                    placeholder="מספר טלפון"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="customerAddress">כתובת</Label>
                <Textarea
                  id="customerAddress"
                  value={customer.address}
                  onChange={(e) => setCustomer({...customer, address: e.target.value})}
                  className="text-right"
                  placeholder="כתובת מלאה"
                />
              </div>
            </div>

            {/* Items Table */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-primary">פריטים</h3>
                <Button onClick={addItem} size="sm" variant="outline">
                  <Plus className="w-4 h-4 ml-2" />
                  הוסף פריט
                </Button>
              </div>
              
              <div className="invoice-table rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="invoice-table">
                      <th className="p-3 text-right">תיאור</th>
                      <th className="p-3 text-center">כמות</th>
                      <th className="p-3 text-center">מחיר יחידה</th>
                      <th className="p-3 text-center">סכום</th>
                      <th className="p-3 text-center">פעולות</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="invoice-table">
                        <td className="p-3">
                          <Textarea
                            value={item.description}
                            onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                            className="text-right border-0 bg-transparent resize-none min-h-[60px]"
                            placeholder="תיאור הפריט"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 0)}
                            className="text-center border-0 bg-transparent w-20 mx-auto"
                            min="1"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <Input
                            type="number"
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                            className="text-center border-0 bg-transparent w-24 mx-auto"
                            min="0"
                            step="0.01"
                          />
                        </td>
                        <td className="p-3 text-center font-semibold">
                          ₪{(item.quantity * item.price).toFixed(2)}
                        </td>
                        <td className="p-3 text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="flex justify-end">
                <div className="invoice-total px-6 py-3 rounded-lg text-xl">
                  סה"כ: ₪{calculateTotal().toFixed(2)}
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">אמצעי תשלום</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="cash"
                    checked={paymentMethod.cash}
                    onCheckedChange={(checked) => 
                      setPaymentMethod({...paymentMethod, cash: checked as boolean})
                    }
                  />
                  <Label htmlFor="cash">מזומן</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="check"
                    checked={paymentMethod.check}
                    onCheckedChange={(checked) => 
                      setPaymentMethod({...paymentMethod, check: checked as boolean})
                    }
                  />
                  <Label htmlFor="check">צ'ק</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="bit"
                    checked={paymentMethod.bit}
                    onCheckedChange={(checked) => 
                      setPaymentMethod({...paymentMethod, bit: checked as boolean})
                    }
                  />
                  <Label htmlFor="bit">ביט</Label>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="bankTransfer"
                    checked={paymentMethod.bankTransfer}
                    onCheckedChange={(checked) => 
                      setPaymentMethod({...paymentMethod, bankTransfer: checked as boolean})
                    }
                  />
                  <Label htmlFor="bankTransfer">העברה בנקאית</Label>
                </div>
              </div>
            </div>

            <Separator />

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button onClick={handlePrint} className="bg-gradient-primary">
                <Printer className="w-4 h-4 ml-2" />
                הדפס חשבונית
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 ml-2" />
                שמור כ-PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
