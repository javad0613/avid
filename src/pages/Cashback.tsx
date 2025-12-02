import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Wallet, ArrowDownLeft, TrendingUp } from "lucide-react";
import { currentUser, cashbackHistory } from "@/lib/data";

export default function Cashback() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-2 sticky top-0 z-10 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <h1 className="font-bold text-lg">کیف پول کش‌بک</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-purple-600 to-purple-800 text-white border-none shadow-xl overflow-hidden relative">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute left-0 bottom-0 w-32 h-32 bg-black/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
          
          <CardContent className="p-6 relative z-10 text-center">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <p className="text-purple-100 text-sm mb-2">موجودی قابل برداشت</p>
            <h2 className="text-4xl font-bold mb-6">
              {currentUser.cashback.toLocaleString('fa-IR')} 
              <span className="text-lg font-normal opacity-80 mr-2">تومان</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-white text-purple-700 hover:bg-purple-50 border-none">
                برداشت وجه
              </Button>
              <Button variant="outline" className="bg-transparent border-white/30 text-white hover:bg-white/10">
                تبدیل به اعتبار
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 text-green-600 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-xs font-bold">مجموع دریافتی</span>
                </div>
                <p className="font-bold text-lg">۱,۴۵۰,۰۰۰</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-2">
                    <ArrowDownLeft className="w-4 h-4" />
                    <span className="text-xs font-bold">برداشت شده</span>
                </div>
                <p className="font-bold text-lg">۲۵۰,۰۰۰</p>
            </div>
        </div>

        {/* History List */}
        <div>
            <h3 className="font-bold text-slate-900 mb-4 px-2">تاریخچه پاداش‌ها</h3>
            <div className="space-y-3">
                {cashbackHistory.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.status === 'bonus' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
                                {item.status === 'bonus' ? '🎁' : '🛍️'}
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-900">{item.source}</p>
                                <p className="text-xs text-slate-400">{item.date}</p>
                            </div>
                        </div>
                        <div className="text-left">
                            <p className="font-bold text-green-600">+{item.amount.toLocaleString('fa-IR')}</p>
                            {item.percent > 0 && (
                                <p className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md inline-block mt-1">
                                    {item.percent}٪ بازگشت
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
