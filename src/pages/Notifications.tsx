import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Bell, CheckCircle2, AlertTriangle, Gift, Info, Check } from "lucide-react";
import { notifications } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Notifications() {
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case "offer": return <Gift className="w-5 h-5 text-purple-600" />;
      case "success": return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "alert": return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case "info": return <Info className="w-5 h-5 text-blue-600" />;
      default: return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "offer": return "bg-purple-50";
      case "success": return "bg-green-50";
      case "alert": return "bg-red-50";
      case "info": return "bg-blue-50";
      default: return "bg-slate-50";
    }
  };

  return (
    <div className="pb-24 space-y-4 animate-in slide-in-from-right-4 duration-500 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronRight className="w-6 h-6" />
            </Button>
            <h1 className="font-bold text-lg">اعلانات</h1>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-primary">
            <Check className="w-4 h-4 mr-1" />
            خواندن همه
        </Button>
      </div>

      <div className="px-4 space-y-3">
        {notifications.map((notif) => (
          <div 
            key={notif.id} 
            className={cn(
                "bg-white p-4 rounded-2xl border shadow-sm flex gap-4 transition-all hover:shadow-md",
                notif.read ? "border-slate-100 opacity-80" : "border-blue-100 bg-blue-50/30"
            )}
          >
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shrink-0", getBgColor(notif.type))}>
                {getIcon(notif.type)}
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                    <h3 className={cn("font-bold text-sm", !notif.read && "text-slate-900")}>{notif.title}</h3>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.date}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{notif.message}</p>
            </div>
            {!notif.read && (
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
            )}
          </div>
        ))}

        {notifications.length === 0 && (
            <div className="text-center py-12 text-slate-400">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>پیام جدیدی ندارید</p>
            </div>
        )}
      </div>
    </div>
  );
}
