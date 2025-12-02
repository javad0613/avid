import { useState } from "react";
import { currentUser, instalments } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Wallet as WalletIcon, Gift, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Wallet() {
  const [selectedInstalment, setSelectedInstalment] = useState<number | null>(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const handlePay = () => {
    // Simulate API call
    setTimeout(() => {
      setIsPaymentSuccess(true);
    }, 1500);
  };

  const closeDialog = () => {
    setSelectedInstalment(null);
    setIsPaymentSuccess(false);
  };

  const activeInstalment = instalments.find(i => i.id === selectedInstalment);

  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-500">
      <h1 className="text-xl font-bold px-1">کیف پول و اقساط</h1>

      {/* Cashback Card */}
      <Card className="bg-gradient-to-br from-emerald-500 to-emerald-700 text-white border-none shadow-lg">
        <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
                <div className="p-2 bg-white/20 rounded-lg">
                    <WalletIcon className="w-6 h-6 text-white" />
                </div>
                <Button size="sm" variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-none h-8">
                    برداشت وجه
                </Button>
            </div>
            <div>
                <p className="text-emerald-100 text-sm mb-1">موجودی کش‌بک قابل استفاده</p>
                <h2 className="text-3xl font-bold">{currentUser.cashback.toLocaleString('fa-IR')} <span className="text-sm font-normal opacity-80">تومان</span></h2>
            </div>
        </CardContent>
      </Card>

      {/* Points Card */}
      <Card>
        <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <Gift className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-sm text-slate-500">امتیاز باشگاه مشتریان</p>
                    <p className="text-xl font-bold text-slate-900">{currentUser.points.toLocaleString('fa-IR')}</p>
                </div>
            </div>
            <Button variant="outline" size="sm">تبدیل</Button>
        </CardContent>
      </Card>

      {/* Instalments Section */}
      <div>
        <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="font-bold text-lg">اقساط فعال</h3>
            <Button variant="ghost" size="sm" className="text-primary text-xs">مشاهده همه</Button>
        </div>

        <div className="space-y-4">
            {instalments.map((inst) => (
                <Card key={inst.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2 bg-slate-50 border-b">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-sm font-bold text-slate-900">{inst.title}</CardTitle>
                                <p className="text-xs text-slate-500 mt-1">{inst.merchant}</p>
                            </div>
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {inst.remainingInstallments} قسط مانده
                            </span>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-slate-500">مبلغ کل:</span>
                            <span className="font-medium">{inst.totalAmount.toLocaleString('fa-IR')}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-4">
                            <span className="text-slate-500">باقی‌مانده:</span>
                            <span className="font-bold text-slate-900">{inst.remainingAmount.toLocaleString('fa-IR')}</span>
                        </div>
                        <Progress value={((inst.totalInstallments - inst.remainingInstallments) / inst.totalInstallments) * 100} className="h-2 mb-4" />
                        
                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed">
                            <div>
                                <p className="text-[10px] text-slate-500">قسط بعدی: {inst.nextDueDate}</p>
                                <p className="text-sm font-bold text-primary">{inst.monthlyPayment.toLocaleString('fa-IR')} تومان</p>
                            </div>
                            <Button size="sm" onClick={() => setSelectedInstalment(inst.id)}>پرداخت</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={!!selectedInstalment} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="sm:max-w-md rounded-2xl" dir="rtl">
          {!isPaymentSuccess ? (
            <>
              <DialogHeader className="text-right">
                <DialogTitle>پرداخت قسط</DialogTitle>
                <DialogDescription>
                  آیا از پرداخت قسط ماه جاری اطمینان دارید؟
                </DialogDescription>
              </DialogHeader>
              
              {activeInstalment && (
                <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">عنوان:</span>
                    <span className="font-bold">{activeInstalment.title}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">مبلغ قابل پرداخت:</span>
                    <span className="font-bold text-primary text-lg">{activeInstalment.monthlyPayment.toLocaleString('fa-IR')} تومان</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">از حساب:</span>
                    <span className="font-medium">کیف پول پروشا ({currentUser.balance.toLocaleString('fa-IR')})</span>
                  </div>
                </div>
              )}

              <DialogFooter className="flex-row gap-2 sm:justify-start">
                <Button variant="outline" className="flex-1" onClick={closeDialog}>انصراف</Button>
                <Button className="flex-1" onClick={handlePay}>تایید و پرداخت</Button>
              </DialogFooter>
            </>
          ) : (
            <div className="py-6 flex flex-col items-center text-center animate-in zoom-in duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">پرداخت موفق</h3>
              <p className="text-slate-500 text-sm mb-6">قسط شما با موفقیت پرداخت شد.</p>
              <Button className="w-full" onClick={closeDialog}>بازگشت</Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
