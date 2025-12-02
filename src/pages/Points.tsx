import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, Gift, Star, Crown, Trophy, ArrowDownLeft } from "lucide-react";
import { currentUser, pointsHistory } from "@/lib/data";

export default function Points() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-2 sticky top-0 z-10 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <h1 className="font-bold text-lg">باشگاه مشتریان</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Points Card */}
        <Card className="bg-gradient-to-r from-amber-500 to-orange-600 text-white border-none shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <p className="text-amber-100 text-sm mb-1">امتیاز شما</p>
                    <h2 className="text-4xl font-bold">{currentUser.points.toLocaleString('fa-IR')}</h2>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                </div>
            </div>
            
            <div className="space-y-2">
                <div className="flex justify-between text-xs text-amber-100">
                    <span>سطح فعلی: طلایی</span>
                    <span>تا سطح پلاتینیوم: ۵۵۰ امتیاز</span>
                </div>
                <Progress value={80} className="h-2 bg-black/20" />
            </div>
          </CardContent>
        </Card>

        {/* Rewards Tiers */}
        <div className="grid grid-cols-3 gap-2">
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center opacity-60 grayscale">
                <Star className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                <p className="text-xs font-bold">نقره‌ای</p>
            </div>
            <div className="bg-white p-3 rounded-xl border-2 border-amber-500 text-center shadow-md relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-full">شما اینجایید</div>
                <Crown className="w-6 h-6 mx-auto text-amber-500 mb-1" />
                <p className="text-xs font-bold text-amber-600">طلایی</p>
            </div>
            <div className="bg-white p-3 rounded-xl border border-slate-200 text-center">
                <Trophy className="w-6 h-6 mx-auto text-slate-800 mb-1" />
                <p className="text-xs font-bold">پلاتینیوم</p>
            </div>
        </div>

        {/* Redeem Options */}
        <div>
            <h3 className="font-bold text-slate-900 mb-4 px-2">جوایز قابل دریافت</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                <div className="min-w-[160px] bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-500 mb-3">
                        <Gift className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-sm mb-1">کد تخفیف دیجی‌کالا</p>
                    <p className="text-xs text-slate-500 mb-3">۵۰ هزار تومان</p>
                    <Button size="sm" variant="outline" className="w-full h-8 text-xs">۵۰۰ امتیاز</Button>
                </div>
                <div className="min-w-[160px] bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-500 mb-3">
                        <Gift className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-sm mb-1">شارژ کیف پول</p>
                    <p className="text-xs text-slate-500 mb-3">۲۰ هزار تومان</p>
                    <Button size="sm" variant="outline" className="w-full h-8 text-xs">۲۰۰ امتیاز</Button>
                </div>
            </div>
        </div>

        {/* History */}
        <div>
            <h3 className="font-bold text-slate-900 mb-4 px-2">تاریخچه امتیازات</h3>
            <div className="space-y-3">
                {pointsHistory.map((item) => (
                    <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'earn' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'}`}>
                                {item.type === 'earn' ? <Star className="w-5 h-5" /> : <ArrowDownLeft className="w-5 h-5" />}
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-900">{item.action}</p>
                                <p className="text-xs text-slate-400">{item.merchant !== '-' ? item.merchant : item.date}</p>
                            </div>
                        </div>
                        <div className="text-left">
                            <p className={`font-bold ${item.type === 'earn' ? 'text-amber-600' : 'text-slate-500'}`}>
                                {item.type === 'earn' ? '+' : ''}{item.points}
                            </p>
                            <p className="text-[10px] text-slate-400">امتیاز</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
