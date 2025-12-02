import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard } from "@/components/ui/CreditCard";
import { ChevronRight, Check } from "lucide-react";
import { cardService } from "@/services/cardService";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const themes = [
  { id: "dark", class: "from-slate-900 via-slate-800 to-slate-900", name: "مشکی کلاسیک" },
  { id: "blue", class: "from-blue-600 via-blue-500 to-blue-700", name: "آبی رویال" },
  { id: "emerald", class: "from-emerald-600 via-emerald-500 to-emerald-700", name: "سبز زمردی" },
  { id: "purple", class: "from-purple-600 via-purple-500 to-purple-700", name: "بنفش" },
  { id: "red", class: "from-red-600 via-red-500 to-red-700", name: "قرمز یاقوتی" },
  { id: "gold", class: "from-amber-500 via-yellow-400 to-amber-600", name: "طلایی" },
];

export default function AddCard() {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [bankName, setBankName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState(themes[1]);
  const [loading, setLoading] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    
    // Format with spaces
    const formatted = value.replace(/(\d{4})(?=\d)/g, "$1  ");
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setExpiry(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cardNumber.replace(/\s/g, "").length !== 16) {
      toast.error("شماره کارت باید ۱۶ رقم باشد");
      return;
    }
    if (!name) {
      toast.error("نام دارنده کارت الزامی است");
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      cardService.addCard({
        name,
        number: cardNumber,
        expiry: expiry || "1405/01",
        org: bankName || "بانک جدید",
        theme: selectedTheme.class
      });
      
      toast.success("کارت با موفقیت افزوده شد");
      setLoading(false);
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 p-4 flex items-center gap-2 sticky top-0 z-10 shadow-sm border-b dark:border-slate-800">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <h1 className="font-bold text-lg">افزودن کارت جدید</h1>
      </div>

      <div className="p-6 space-y-8">
        {/* Card Preview */}
        <div className="transform scale-95 sm:scale-100 transition-transform">
          <CreditCard 
            name={name || "نام دارنده کارت"}
            number={cardNumber || "0000  0000  0000  0000"}
            expiry={expiry || "YY/MM"}
            org={bankName || "نام بانک"}
            className={selectedTheme.class}
          />
        </div>

        {/* Theme Selector */}
        <div>
          <Label className="mb-3 block text-xs text-slate-500 dark:text-slate-400">رنگ کارت</Label>
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme)}
                className={cn(
                  "w-10 h-10 rounded-full bg-gradient-to-br shrink-0 flex items-center justify-center transition-all",
                  theme.class,
                  selectedTheme.id === theme.id ? "ring-4 ring-offset-2 ring-primary/30 scale-110" : "opacity-70 hover:opacity-100"
                )}
                title={theme.name}
              >
                {selectedTheme.id === theme.id && <Check className="w-4 h-4 text-white" />}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">شماره کارت</Label>
            <Input 
              id="cardNumber" 
              placeholder="0000  0000  0000  0000" 
              dir="ltr" 
              className="text-left font-mono tracking-widest text-lg h-12"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={22}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">تاریخ انقضا</Label>
              <Input 
                id="expiry" 
                placeholder="05/02" 
                dir="ltr" 
                className="text-center font-mono text-lg h-12"
                value={expiry}
                onChange={handleExpiryChange}
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv2">CVV2 (اختیاری)</Label>
              <Input 
                id="cvv2" 
                placeholder="123" 
                dir="ltr" 
                type="password"
                className="text-center font-mono text-lg h-12"
                maxLength={4}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">نام دارنده کارت</Label>
            <Input 
              id="name" 
              placeholder="نام و نام خانوادگی" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bank">نام بانک / عنوان کارت</Label>
            <Input 
              id="bank" 
              placeholder="مثال: بانک سامان" 
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="h-12"
            />
          </div>

          <Button type="submit" className="w-full h-12 text-lg rounded-xl mt-6" disabled={loading}>
            {loading ? "در حال ثبت..." : "افزودن کارت"}
          </Button>
        </form>
      </div>
    </div>
  );
}
