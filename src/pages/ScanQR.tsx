import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Zap, CheckCircle2, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { currentUser } from "@/lib/data";

export default function ScanQR() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"scan" | "amount" | "success">("scan");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Simulate scanning delay
  useEffect(() => {
    if (step === "scan") {
      const timer = setTimeout(() => {
        setStep("amount");
      }, 3000); // Auto-scan after 3 seconds for demo
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handlePay = () => {
    if (!amount) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <AnimatePresence mode="wait">
        {step === "scan" && (
          <motion.div 
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex-1 flex flex-col"
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 text-white">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:bg-white/20">
                <X className="w-6 h-6" />
              </Button>
              <span className="font-medium">اسکن کد QR</span>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <Zap className="w-6 h-6" />
              </Button>
            </div>

            {/* Camera Viewfinder Simulation */}
            <div className="flex-1 bg-slate-900 relative overflow-hidden flex items-center justify-center">
              {/* Animated Background to simulate camera feed */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-30 blur-sm"></div>
              
              {/* Scan Frame */}
              <div className="relative w-64 h-64 border-2 border-white/50 rounded-3xl z-10 flex items-center justify-center">
                <div className="absolute inset-0 border-2 border-primary rounded-3xl animate-pulse"></div>
                {/* Corner Markers */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary -mt-1 -ml-1 rounded-tl-xl"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary -mt-1 -mr-1 rounded-tr-xl"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary -mb-1 -ml-1 rounded-bl-xl"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary -mb-1 -mr-1 rounded-br-xl"></div>
                
                {/* Scanning Line */}
                <div className="absolute left-2 right-2 h-0.5 bg-primary shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
              </div>

              <div className="absolute bottom-20 text-white text-center opacity-80 text-sm">
                دوربین را مقابل کد QR فروشنده بگیرید
              </div>
            </div>
          </motion.div>
        )}

        {step === "amount" && (
          <motion.div 
            key="amount"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 bg-slate-50 flex flex-col"
          >
            <div className="p-4 flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setStep("scan")}>
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <h1 className="font-bold text-lg">پرداخت به پذیرنده</h1>
            </div>

            <div className="flex-1 p-6 flex flex-col items-center pt-12">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border flex items-center justify-center text-4xl mb-4">
                    ☕
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">کافه لمیز - شعبه ونک</h2>
                <p className="text-slate-500 text-sm mb-8">پذیرنده رسمی پروشا</p>

                <div className="w-full max-w-xs space-y-4">
                    <div className="relative">
                        <Input 
                            type="number" 
                            placeholder="0" 
                            className="text-center text-3xl h-16 font-bold tracking-widest bg-white shadow-sm"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            autoFocus
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">تومان</span>
                    </div>
                    
                    <div className="flex justify-between text-sm px-2">
                        <span className="text-slate-500">موجودی کیف پول:</span>
                        <span className="font-medium">{currentUser.balance.toLocaleString('fa-IR')} تومان</span>
                    </div>
                </div>
            </div>

            <div className="p-6 bg-white border-t">
                <Button 
                    className="w-full h-12 text-lg rounded-xl" 
                    disabled={!amount || loading}
                    onClick={handlePay}
                >
                    {loading ? "در حال پردازش..." : "تایید و پرداخت"}
                </Button>
            </div>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div 
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex-1 bg-white flex flex-col items-center justify-center p-6 text-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">پرداخت موفق</h2>
            <p className="text-slate-500 mb-8">مبلغ {Number(amount).toLocaleString('fa-IR')} تومان به کافه لمیز پرداخت شد.</p>

            <div className="w-full bg-slate-50 rounded-2xl p-4 space-y-3 mb-8">
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">شماره پیگیری</span>
                    <span className="font-mono font-bold">TRX-882910</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">تاریخ</span>
                    <span className="font-medium">۱۴۰۳/۰۸/۱۲ - ۱۸:۴۵</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-slate-500">کش‌بک دریافتی</span>
                    <span className="font-medium text-green-600">+{Math.floor(Number(amount) * 0.02).toLocaleString('fa-IR')} تومان</span>
                </div>
            </div>

            <Button className="w-full h-12 rounded-xl" onClick={() => navigate("/home")}>
                بازگشت به خانه
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
