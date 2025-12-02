import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Check, ChevronLeft, ChevronRight, Briefcase, Building2, Wallet, Upload, FileText, ShieldCheck, Loader2, X, Image as ImageIcon, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { currentUser } from "@/lib/data";
import { creditService } from "@/services/creditService";

// Types
type Plan = {
  id: string;
  name: string;
  icon: any;
  maxLimit: number;
  maxDuration: number;
  prepayment: number;
  interestRate: number;
  color: string;
};

const plans: Plan[] = [
  {
    id: "basic",
    name: "طرح پایه",
    icon: Wallet,
    maxLimit: 30000000,
    maxDuration: 12,
    prepayment: 20,
    interestRate: 15,
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "mellat",
    name: "بانک ملت",
    icon: Building2,
    maxLimit: 100000000,
    maxDuration: 12,
    prepayment: 30,
    interestRate: 18,
    color: "bg-red-50 text-red-600",
  },
  {
    id: "blu",
    name: "بانک بلو",
    icon: Briefcase,
    maxLimit: 150000000,
    maxDuration: 18,
    prepayment: 20,
    interestRate: 20,
    color: "bg-indigo-50 text-indigo-600",
  },
];

export default function RequestCredit() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(plans[0]);
  const [amount, setAmount] = useState(10000000);
  const [duration, setDuration] = useState(12);
  
  // Document States
  const [salarySlip, setSalarySlip] = useState<File | null>(null);
  const [idCard, setIdCard] = useState<File | null>(null);
  const [validating, setValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Calculations
  const totalInterest = (amount * selectedPlan.interestRate * (duration / 12)) / 100;
  const totalRepayment = amount + totalInterest;
  const monthlyPayment = totalRepayment / duration;

  const handleNext = async () => {
    if (step === 3) {
        if (!isValidated) {
            toast.error("لطفا ابتدا اعتبارسنجی آنلاین را انجام دهید.");
            return;
        }
        if (!salarySlip || !idCard) {
            toast.error("لطفا تمام مدارک مورد نیاز را بارگذاری کنید.");
            return;
        }
        
        // Submit Request
        setSubmitting(true);
        try {
            await creditService.addRequest({
                planId: selectedPlan.id,
                planName: selectedPlan.name,
                amount: amount,
                duration: duration
            });
            setStep(4);
        } catch (error) {
            toast.error("خطا در ثبت درخواست");
        } finally {
            setSubmitting(false);
        }
        return;
    }
    if (step < 4) setStep(step + 1);
    else navigate("/home");
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  const handleValidation = async () => {
    setValidating(true);
    setValidationError(null);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const apiUrl = import.meta.env.VITE_API_URL || "https://s.api.ir";

      if (!apiKey || apiKey === "YOUR_API_KEY") {
        // Fallback simulation
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsValidated(true);
        toast.success("اعتبارسنجی با موفقیت انجام شد (شبیه‌سازی).");
        return;
      }

      const response = await fetch(`${apiUrl}/api/sw1/UnpaidCheque`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          nationalCode: currentUser.nationalCode
        })
      });

      if (!response.ok) throw new Error("Server Error");
      const data = await response.json();

      if (data.success) {
        const chequeCount = data.data?.count || 0;
        if (chequeCount === 0) {
          setIsValidated(true);
          toast.success("اعتبارسنجی موفق: سوابق مالی شما تایید شد.");
        } else {
          setValidationError(`شما ${chequeCount} فقره چک برگشتی دارید.`);
          toast.error("اعتبارسنجی ناموفق بود.");
        }
      } else {
        throw new Error(data.message);
      }

    } catch (error: any) {
      setValidationError("خطا در سیستم اعتبارسنجی. لطفا مجددا تلاش کنید.");
      toast.error("خطا در سیستم اعتبارسنجی");
    } finally {
      setValidating(false);
    }
  };

  const handleFileUpload = (file: File, setter: (f: File | null) => void) => {
    setter(file);
    toast.success(`فایل ${file.name} با موفقیت انتخاب شد.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-32">
      {/* Header Banner */}
      <div className="bg-primary text-white pt-8 pb-16 px-6 rounded-b-[2.5rem] relative overflow-hidden shadow-xl">
        <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 left-4 z-20 text-white hover:bg-white/20"
            onClick={() => navigate("/home")}
        >
            <X className="w-6 h-6" />
        </Button>

        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold mb-2">درخواست اعتبار پروشا</h1>
          <p className="text-blue-100 text-sm">خرید اقساطی آسان با کمترین کارمزد</p>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex justify-center -mt-8 mb-8 relative z-20">
        <div className="bg-white p-2 rounded-full shadow-lg flex items-center gap-2 px-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300",
                  step >= s ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                )}
              >
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              {s < 4 && (
                <div className={cn("w-4 h-0.5 mx-1 transition-colors duration-300", step > s ? "bg-primary" : "bg-slate-200")} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">انتخاب طرح</h2>
              </div>

              <div className="grid gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan)}
                    className={cn(
                      "bg-white p-4 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden",
                      selectedPlan.id === plan.id 
                        ? "border-primary shadow-lg shadow-primary/10" 
                        : "border-transparent shadow-sm hover:border-slate-200"
                    )}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", plan.color)}>
                          <plan.icon className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-lg">{plan.name}</span>
                      </div>
                      {selectedPlan.id === plan.id && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center mb-4 pb-4 border-b border-slate-50">
                      <p className="text-xs text-slate-400 mb-1">سقف اعتبار</p>
                      <p className="text-sm font-bold text-slate-700">{plan.maxLimit.toLocaleString('fa-IR')} تومان</p>
                    </div>

                    <div className="space-y-2">
                      <FeatureItem label="حداکثر مدت" value={`${plan.maxDuration} ماه`} />
                      <FeatureItem label="پیش‌پرداخت" value={`${plan.prepayment}٪`} />
                      <FeatureItem label="نرخ سود" value={`${plan.interestRate}٪`} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">محاسبه اقساط</h2>
              </div>

              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">مبلغ وام (تومان)</label>
                    <span className="text-lg font-bold text-primary">{amount.toLocaleString('fa-IR')}</span>
                  </div>
                  <Slider
                    value={[amount]}
                    min={5000000}
                    max={selectedPlan.maxLimit}
                    step={1000000}
                    onValueChange={(val) => setAmount(val[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-slate-400 px-1">
                    <span>۵ میلیون</span>
                    <span>{selectedPlan.maxLimit.toLocaleString('fa-IR')}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-bold text-slate-700">مدت بازپرداخت (ماه)</label>
                    <span className="text-lg font-bold text-primary">{duration} ماه</span>
                  </div>
                  <Slider
                    value={[duration]}
                    min={3}
                    max={selectedPlan.maxDuration}
                    step={1}
                    onValueChange={(val) => setDuration(val[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-slate-400 px-1">
                    <span>۳ ماه</span>
                    <span>{selectedPlan.maxDuration} ماه</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-100 p-6 rounded-3xl space-y-4">
                <h3 className="font-bold text-slate-900 mb-4">جزئیات محاسبات</h3>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">قسط ماهانه:</span>
                  <span className="text-xl font-bold text-blue-600">{Math.round(monthlyPayment).toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">تومان</span></span>
                </div>
                <div className="flex justify-between items-center text-sm text-slate-500">
                  <span>مجموع بازپرداخت:</span>
                  <span>{Math.round(totalRepayment).toLocaleString('fa-IR')} تومان</span>
                </div>
              </div>
            </motion.div>
          )}

          {step === 3 && (
             <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
             >
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900">مدارک و اعتبارسنجی</h2>
                    <p className="text-sm text-slate-500 mt-1">لطفا مدارک هویتی و شغلی خود را بارگذاری کنید</p>
                </div>

                <div className={cn("bg-white p-5 rounded-2xl border shadow-sm transition-colors", validationError ? "border-red-200 bg-red-50/20" : "border-slate-100")}>
                    <div className="flex items-center gap-3 mb-4">
                        <div className={cn("p-2 rounded-lg", validationError ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-600")}>
                            {validationError ? <AlertTriangle className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900">اعتبارسنجی بانکی</h3>
                            <p className="text-xs text-slate-500">استعلام آنلاین سوابق مالی (چک برگشتی)</p>
                        </div>
                    </div>
                    
                    {isValidated ? (
                         <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-xl text-sm font-medium">
                            <Check className="w-5 h-5" />
                            رتبه اعتباری شما تایید شد (A+)
                         </div>
                    ) : (
                        <>
                            <Button 
                                variant="outline" 
                                className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
                                onClick={handleValidation}
                                disabled={validating}
                            >
                                {validating ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        در حال استعلام...
                                    </>
                                ) : "شروع اعتبارسنجی آنلاین"}
                            </Button>
                            {validationError && (
                                <p className="text-xs text-red-500 mt-3 text-center font-medium">{validationError}</p>
                            )}
                        </>
                    )}
                </div>

                <div className="space-y-4">
                    <UploadBox 
                        title="تصویر کارت ملی" 
                        desc="تصویر رو یا پشت کارت ملی هوشمند (JPG, PNG)"
                        icon={FileText}
                        file={idCard}
                        onUpload={(file: File) => handleFileUpload(file, setIdCard)}
                    />
                    <UploadBox 
                        title="فیش حقوقی / گواهی کسر از حقوق" 
                        desc="آخرین فیش حقوقی مهر شده (JPG, PNG)"
                        icon={Briefcase}
                        file={salarySlip}
                        onUpload={(file: File) => handleFileUpload(file, setSalarySlip)}
                    />
                </div>
             </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 py-8"
            >
               <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Check className="w-12 h-12 text-green-600" />
               </div>
               <h2 className="text-2xl font-bold text-slate-900">درخواست ثبت شد</h2>
               <p className="text-slate-500 leading-relaxed">
                 درخواست اعتبار شما با موفقیت ثبت شد. کارشناسان پروشا مدارک شما را بررسی کرده و نتیجه را تا ۲۴ ساعت آینده اطلاع خواهند داد.
               </p>
               
               <div className="bg-slate-50 p-4 rounded-2xl text-right space-y-3 text-sm">
                 <div className="flex justify-between">
                   <span className="text-slate-500">کد پیگیری:</span>
                   <span className="font-mono font-bold">PRS-982374</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-slate-500">مبلغ درخواستی:</span>
                   <span className="font-bold">{amount.toLocaleString('fa-IR')} تومان</span>
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 z-[60]">
        <div className="max-w-md mx-auto flex gap-3">
          {step > 1 && step < 4 && (
            <Button variant="outline" onClick={handleBack} className="flex-1 h-12 rounded-xl gap-2">
              <ChevronRight className="w-4 h-4" />
              مرحله قبل
            </Button>
          )}
          <Button 
            onClick={handleNext} 
            disabled={submitting}
            className="flex-[2] h-12 rounded-xl gap-2"
          >
            {submitting ? "در حال ثبت..." : step === 4 ? "بازگشت به خانه" : "ادامه"}
            {!submitting && step < 4 && <ChevronLeft className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <div className="flex items-center gap-2 text-slate-500">
        <Check className="w-3 h-3 text-green-500" />
        <span>{label}</span>
      </div>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
}

function UploadBox({ title, desc, icon: Icon, file, onUpload }: { title: string, desc: string, icon: any, file: File | null, onUpload: (file: File) => void }) {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    return (
        <div 
            onClick={handleClick}
            className={cn(
                "bg-white p-4 rounded-2xl border-2 border-dashed transition-colors cursor-pointer flex items-center gap-4 relative overflow-hidden",
                file ? "border-green-500 bg-green-50/30" : "border-slate-200 hover:border-primary hover:bg-slate-50"
            )}
        >
            <input 
                type="file" 
                ref={inputRef} 
                className="hidden" 
                accept="image/jpeg, image/png, image/jpg"
                onChange={handleFileChange}
            />
            
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0", file ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-500")}>
                {file ? <ImageIcon className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className={cn("font-bold text-sm truncate", file ? "text-green-700" : "text-slate-900")}>
                    {file ? file.name : title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                    {file ? `${(file.size / 1024).toFixed(0)} KB` : desc}
                </p>
            </div>
            {!file ? (
                <Upload className="w-5 h-5 text-slate-400" />
            ) : (
                <div className="bg-white/50 p-1 rounded-full">
                    <Check className="w-4 h-4 text-green-600" />
                </div>
            )}
        </div>
    )
}
