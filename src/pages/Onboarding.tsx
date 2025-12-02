import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ShieldCheck, CreditCard, Gift } from "lucide-react";

export default function Onboarding() {
  const [step, setStep] = useState(0); // 0-2: Slides, 3: Login
  const navigate = useNavigate();

  const slides = [
    {
      title: "به پروشا خوش آمدید",
      desc: "کارت اعتباری سازمانی هوشمند برای مدیریت هزینه‌ها و دریافت پاداش",
      icon: <CreditCard className="w-24 h-24 text-primary" />,
    },
    {
      title: "خرید اقساطی و راحت",
      desc: "بدون نیاز به ضامن، از فروشگاه‌های معتبر خرید کنید و قسطی پرداخت کنید",
      icon: <ShieldCheck className="w-24 h-24 text-primary" />,
    },
    {
      title: "پاداش و بازگشت وجه",
      desc: "با هر خرید امتیاز بگیرید و بخشی از مبلغ خرید را پس بگیرید",
      icon: <Gift className="w-24 h-24 text-primary" />,
    },
  ];

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else setStep(3);
  };

  if (step === 3) {
    return <LoginScreen onLogin={() => navigate("/home")} />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6 relative overflow-hidden">
       {/* Background Blobs */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
       <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

      <div className="flex-1 flex flex-col items-center justify-center text-center z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="mb-8 p-6 bg-blue-50 rounded-full shadow-sm">
              {slides[step].icon}
            </div>
            <h1 className="text-2xl font-bold mb-4 text-slate-900">{slides[step].title}</h1>
            <p className="text-slate-500 leading-relaxed max-w-xs">{slides[step].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="z-10">
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === step ? "w-8 bg-primary" : "w-2 bg-slate-200"}`}
            />
          ))}
        </div>
        <Button onClick={handleNext} className="w-full h-12 text-lg rounded-xl shadow-lg shadow-primary/20">
          {step === 2 ? "شروع کنید" : "بعدی"}
          <ChevronLeft className="mr-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState("phone"); // phone or otp

  const handleSendOtp = () => {
    if (phone.length >= 10) setStage("otp");
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col justify-center">
      <div className="mb-10 text-center">
        <div className="w-16 h-16 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-primary/30">
            <span className="text-white font-bold text-2xl">P</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">ورود به پروشا</h1>
        <p className="text-slate-500 mt-2">شماره موبایل خود را وارد کنید</p>
      </div>

      <div className="space-y-6">
        {stage === "phone" ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-2">
              <Label htmlFor="phone">شماره موبایل</Label>
              <Input 
                id="phone" 
                placeholder="0912..." 
                className="h-12 text-left text-lg tracking-widest" 
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button onClick={handleSendOtp} className="w-full h-12 mt-6 text-lg rounded-xl">
              دریافت کد تایید
            </Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
             <div className="space-y-2">
              <Label htmlFor="otp">کد تایید</Label>
              <Input 
                id="otp" 
                placeholder="1 2 3 4" 
                className="h-12 text-center text-2xl tracking-[1em]" 
                dir="ltr"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <Button onClick={onLogin} className="w-full h-12 mt-6 text-lg rounded-xl">
              ورود
            </Button>
            <Button variant="ghost" onClick={() => setStage("phone")} className="w-full mt-2">
              تغییر شماره
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
