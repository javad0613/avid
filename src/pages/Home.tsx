import { CreditCard } from "@/components/ui/CreditCard";
import { currentUser, transactions, notifications } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Bell, Plus, ArrowUpRight, Wallet, Gift, 
  Receipt, Car, Smartphone, FileText, Clock
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { creditService } from "@/services/creditService";
import { cardService, CardData } from "@/services/cardService";
import { CreditRequest } from "@/types";

export default function Home() {
  const navigate = useNavigate();
  const creditUtilization = ((currentUser.limit - currentUser.balance) / currentUser.limit) * 100;
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const [activeRequests, setActiveRequests] = useState<CreditRequest[]>([]);
  const [userCards, setUserCards] = useState<CardData[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
        // Load Credit Requests
        const reqs = await creditService.getRequests();
        setActiveRequests(reqs.filter(r => r.status === 'pending').slice(0, 2));

        // Load Cards
        const cards = cardService.getCards();
        setUserCards(cards);
    };
    loadData();
  }, []);

  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex justify-between items-center px-4 pt-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">سلام، {currentUser.name}</p>
          <p className="text-xs font-medium text-primary">{currentUser.org}</p>
        </div>
        <Link to="/notifications">
            <Button variant="outline" size="icon" className="rounded-full relative bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <Bell className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            {unreadCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
            )}
            </Button>
        </Link>
      </div>

      {/* Card Carousel */}
      <div className="relative">
        <Carousel className="w-full" opts={{ direction: 'rtl' }}>
          <CarouselContent className="-ml-4 px-4">
            {userCards.map((card) => (
              <CarouselItem key={card.id} className="pl-4 basis-[90%]">
                <div className="relative">
                  <CreditCard 
                    name={card.name}
                    number={card.number}
                    expiry={card.expiry}
                    org={card.org}
                    className={card.theme}
                  />
                </div>
              </CarouselItem>
            ))}
            {/* Add New Card Button */}
            <CarouselItem className="pl-4 basis-[25%] flex items-center">
               <button 
                 onClick={() => navigate("/add-card")}
                 className="w-full aspect-[0.6] rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-2 text-slate-400 hover:border-primary hover:text-primary transition-colors bg-slate-50 dark:bg-slate-900"
               >
                  <Plus className="w-8 h-8" />
                  <span className="text-xs font-medium writing-vertical">افزودن کارت</span>
               </button>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      {/* Credit Info */}
      <div className="px-4">
        <Card className="border-none shadow-sm bg-white dark:bg-slate-900">
          <CardContent className="p-4 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">اعتبار باقی‌مانده</p>
                <p className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {currentUser.balance.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">تومان</span>
                </p>
              </div>
              <div className="text-left">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">کل اعتبار</p>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{currentUser.limit.toLocaleString('fa-IR')}</p>
              </div>
            </div>
            <div className="space-y-1">
              <Progress value={creditUtilization} className="h-2" />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>مصرف شده</span>
                <span>{(100 - creditUtilization).toFixed(0)}٪ باقی‌مانده</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Requests Widget */}
      {activeRequests.length > 0 && (
        <div className="px-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-100 dark:border-amber-900/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-amber-500 shadow-sm">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200">درخواست در حال بررسی</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">{activeRequests[0].planName} - {activeRequests[0].amount.toLocaleString('fa-IR')} تومان</p>
                    </div>
                </div>
                <Button size="sm" variant="ghost" className="text-xs text-amber-700 dark:text-amber-500 h-8" onClick={() => navigate("/credit-history")}>
                    مشاهده
                </Button>
            </div>
        </div>
      )}

      {/* Main Actions Grid */}
      <div className="px-2">
        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3 px-2 text-sm">خدمات پرکاربرد</h3>
        <div className="grid grid-cols-4 gap-y-4">
          <QuickAction 
            icon={ArrowUpRight} 
            label="پرداخت قسط" 
            color="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
            onClick={() => navigate("/wallet")}
          />
          <QuickAction 
            icon={Plus} 
            label="درخواست اعتبار" 
            color="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400" 
            onClick={() => navigate("/request-credit")}
          />
          <QuickAction 
            icon={FileText} 
            label="وضعیت اعتبار" 
            color="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400" 
            onClick={() => navigate("/credit-history")}
          />
          <QuickAction 
            icon={Wallet} 
            label="کش‌بک" 
            color="bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400" 
            onClick={() => navigate("/cashback")}
          />
          
          {/* Row 2 */}
          <QuickAction 
            icon={Gift} 
            label="امتیازها" 
            color="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400" 
            onClick={() => navigate("/points")}
          />
          <QuickAction 
            icon={Receipt} 
            label="قبض" 
            color="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400" 
            onClick={() => navigate("/bills")}
          />
          <QuickAction 
            icon={Car} 
            label="عوارض" 
            color="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400" 
            onClick={() => navigate("/car-services")}
          />
          <QuickAction 
            icon={Smartphone} 
            label="شارژ" 
            color="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400" 
            onClick={() => navigate("/recharge")}
          />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">تراکنش‌های اخیر</h3>
          <Link to="/transactions" className="text-xs text-primary hover:underline">مشاهده همه</Link>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-lg border dark:border-slate-700">
                  {tx.logo}
                </div>
                <div>
                  <p className="font-medium text-sm text-slate-900 dark:text-slate-100">{tx.merchant}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{tx.date.split('-')[0]}</p>
                </div>
              </div>
              <div className="text-left">
                <p className="font-bold text-sm text-slate-900 dark:text-slate-100">{tx.amount.toLocaleString('fa-IR')}</p>
                {tx.cashback > 0 && (
                  <p className="text-[10px] text-green-600 dark:text-green-400">+{tx.cashback.toLocaleString('fa-IR')} پاداش</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, color, onClick }: { icon: any, label: string, color: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-1 active:scale-95 transition-transform"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 dark:border-slate-800 ${color}`}>
        <Icon size={24} />
      </div>
      <span className="text-[11px] font-medium text-slate-600 dark:text-slate-400 text-center leading-tight">{label}</span>
    </button>
  );
}
