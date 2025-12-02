import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronRight, Smartphone, Wifi, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function Recharge() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const amounts = [20000, 50000, 100000, 200000];
  const packages = [
    { id: 1, name: "۱ گیگابایت - ۱ روزه", price: 12000 },
    { id: 2, name: "۳ گیگابایت - ۳ روزه", price: 28000 },
    { id: 3, name: "۵ گیگابایت - ۷ روزه", price: 45000 },
    { id: 4, name: "۱۰ گیگابایت - ۳۰ روزه", price: 85000 },
  ];

  const handleBuy = () => {
    if (phone.length < 10) {
        toast.error("شماره موبایل صحیح نیست");
        return;
    }
    if (!selectedAmount) {
        toast.error("لطفا مبلغ یا بسته را انتخاب کنید");
        return;
    }

    setLoading(true);
    setTimeout(() => {
        setLoading(false);
        toast.success("خرید با موفقیت انجام شد");
        navigate("/home");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-in fade-in duration-500">
      <div className="bg-white p-4 flex items-center gap-2 sticky top-0 z-10 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <h1 className="font-bold text-lg">شارژ و اینترنت</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <label className="text-sm font-medium block mb-2">شماره موبایل</label>
            <Input 
                placeholder="0912..." 
                className="text-left text-lg h-12 tracking-widest" 
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <div className="flex gap-2 mt-3 justify-end">
                <div className="w-8 h-8 rounded-full bg-yellow-400/20 flex items-center justify-center p-1">
                    <div className="w-full h-full bg-yellow-400 rounded-full"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center p-1">
                    <div className="w-full h-full bg-blue-400 rounded-full"></div>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-400/20 flex items-center justify-center p-1">
                    <div className="w-full h-full bg-purple-400 rounded-full"></div>
                </div>
            </div>
        </div>

        <Tabs defaultValue="charge" className="w-full">
            <TabsList className="w-full grid grid-cols-2 h-12 bg-white border border-slate-100 rounded-xl p-1">
                <TabsTrigger value="charge" className="rounded-lg">شارژ مستقیم</TabsTrigger>
                <TabsTrigger value="internet" className="rounded-lg">بسته اینترنت</TabsTrigger>
            </TabsList>

            <TabsContent value="charge" className="mt-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    {amounts.map((amt) => (
                        <div 
                            key={amt}
                            onClick={() => setSelectedAmount(amt)}
                            className={`p-4 rounded-xl border-2 cursor-pointer text-center transition-all ${selectedAmount === amt ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                        >
                            <p className="font-bold text-lg">{amt.toLocaleString('fa-IR')}</p>
                            <p className="text-xs text-slate-400">تومان</p>
                        </div>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="internet" className="mt-6 space-y-3">
                {packages.map((pkg) => (
                    <div 
                        key={pkg.id}
                        onClick={() => setSelectedAmount(pkg.price)}
                        className={`p-4 rounded-xl border-2 cursor-pointer flex justify-between items-center transition-all ${selectedAmount === pkg.price ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                <Wifi className="w-5 h-5 text-slate-600" />
                            </div>
                            <span className="font-medium text-sm">{pkg.name}</span>
                        </div>
                        <span className="font-bold text-primary">{pkg.price.toLocaleString('fa-IR')} تومان</span>
                    </div>
                ))}
            </TabsContent>
        </Tabs>

        <Button className="w-full h-12 rounded-xl mt-4" onClick={handleBuy} disabled={loading}>
            {loading ? "در حال انجام..." : `پرداخت ${selectedAmount ? selectedAmount.toLocaleString('fa-IR') : '0'} تومان`}
        </Button>
      </div>
    </div>
  );
}
