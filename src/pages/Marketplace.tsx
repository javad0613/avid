import { merchants } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { MapPin, QrCode, ExternalLink } from "lucide-react";

export default function Marketplace() {
  const categories = ["همه", "خواربار", "الکترونیک", "پوشاک", "رستوران", "سلامت", "خدمات"];

  return (
    <div className="pb-24 space-y-6 animate-in fade-in duration-500">
      <div className="px-1">
        <h1 className="text-xl font-bold mb-4">فروشگاه‌های طرف قرارداد</h1>
        
        <ScrollArea className="w-full whitespace-nowrap mb-6">
          <div className="flex w-max space-x-2 space-x-reverse p-1">
            {categories.map((cat, i) => (
              <Button 
                key={i} 
                variant={i === 0 ? "default" : "outline"} 
                size="sm" 
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Featured Banner */}
      <div className="mx-1 p-4 bg-gradient-to-r from-primary to-blue-600 rounded-2xl text-white shadow-lg mb-6">
        <div className="flex justify-between items-center">
            <div>
                <p className="text-xs opacity-80 mb-1">پیشنهاد ویژه</p>
                <h3 className="font-bold text-lg mb-2">جشنواره پاییزه دیجی‌کالا</h3>
                <p className="text-sm opacity-90">تا ۵٪ کش‌بک بیشتر برای خرید لوازم خانگی</p>
            </div>
            <div className="text-4xl">🎉</div>
        </div>
      </div>

      <div className="space-y-4">
        {merchants.map((merchant) => (
          <div key={merchant.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex p-4 gap-4">
                <img src={merchant.image} alt={merchant.name} className="w-16 h-16 rounded-xl object-cover bg-slate-100" />
                <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-slate-900">{merchant.name}</h3>
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded-md">{merchant.category}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <span className="text-xs bg-red-50 text-red-600 px-2 py-1 rounded-md font-medium">{merchant.discount}</span>
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-md font-medium">{merchant.cashback}</span>
                    </div>
                </div>
            </div>
            <div className="bg-slate-50 p-2 flex gap-2">
                <Button variant="ghost" className="flex-1 h-9 text-xs gap-2">
                    <MapPin className="w-3 h-3" />
                    مسیریابی
                </Button>
                <div className="w-px bg-slate-200 my-1"></div>
                <Button variant="ghost" className="flex-1 h-9 text-xs gap-2">
                    <ExternalLink className="w-3 h-3" />
                    خرید آنلاین
                </Button>
                <div className="w-px bg-slate-200 my-1"></div>
                <Button variant="ghost" className="flex-1 h-9 text-xs gap-2 text-primary">
                    <QrCode className="w-3 h-3" />
                    پرداخت
                </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
