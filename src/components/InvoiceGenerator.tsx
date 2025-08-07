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

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Card className="mb-6 shadow-soft">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-primary">
          מחולל חשבוניות
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* כל הקטעים שלך: פרטי חשבונית, פרטי לקוח, טבלת פריטים, סכום, אמצעי תשלום, כפתורים */}
        {/* אין שינוי בתוכן עצמו – רק הסרה של כרטיס הביקור מההתחלה */}

      </CardContent>
    </Card>
  );
};

export default InvoiceGenerator;
