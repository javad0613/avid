import { useState } from "react";
import { transactions } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Transactions() {
  const [filter, setFilter] = useState("all");

  return (
    <div className="pb-24 space-y-4 animate-in slide-in-from-bottom-4 duration-500">
      <div className="sticky top-0 bg-white/80 backdrop-blur-md z-20 pb-2 pt-2">
        <h1 className="text-xl font-bold mb-4 px-1">تراکنش‌ها</h1>
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input placeholder="جستجو..." className="pr-9 h-10 bg-slate-50" />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-3xl">
              <SheetHeader className="mb-4 text-right">
                <SheetTitle>فیلتر تراکنش‌ها</SheetTitle>
              </SheetHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium">بازه زمانی</label>
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">این ماه</Button>
                        <Button variant="outline" className="flex-1">ماه گذشته</Button>
                        <Button variant="outline" className="flex-1">۳ ماه اخیر</Button>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium">نوع تراکنش</label>
                    <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">خرید</Button>
                        <Button variant="outline" className="flex-1">اقساط</Button>
                        <Button variant="outline" className="flex-1">برگشتی</Button>
                    </div>
                </div>
                <Button className="w-full mt-4">اعمال فیلتر</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="w-full grid grid-cols-3 bg-slate-100">
            <TabsTrigger value="all">همه</TabsTrigger>
            <TabsTrigger value="online">آنلاین</TabsTrigger>
            <TabsTrigger value="pos">حضوری</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-lg border">
                        {tx.logo}
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900">{tx.merchant}</h3>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{tx.category}</span>
                    </div>
                </div>
                <div className="text-left">
                    <p className="font-bold text-slate-900">{tx.amount.toLocaleString('fa-IR')}</p>
                    <p className="text-[10px] text-slate-400">{tx.date}</p>
                </div>
            </div>
            
            <div className="h-px bg-slate-50 w-full"></div>
            
            <div className="flex justify-between items-center text-xs">
                <div className="flex gap-4">
                    <span className="text-green-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        {tx.cashback.toLocaleString('fa-IR')} تومان کش‌بک
                    </span>
                    <span className="text-orange-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        {tx.points} امتیاز
                    </span>
                </div>
                <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded text-[10px]">موفق</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
