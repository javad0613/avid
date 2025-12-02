import { currentUser } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { 
  User, Settings, Bell, Shield, HelpCircle, LogOut, ChevronLeft, CreditCard
} from "lucide-react";

export default function Profile() {
  return (
    <div className="pb-24 animate-in slide-in-from-right-4 duration-500">
      <div className="bg-slate-900 text-white p-6 pt-10 pb-16 rounded-b-[2.5rem] shadow-xl mb-6">
        <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 border-2 border-white/20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <div>
                <h1 className="text-xl font-bold">{currentUser.name}</h1>
                <p className="text-slate-400 text-sm">{currentUser.org}</p>
            </div>
        </div>
      </div>

      <div className="px-4 -mt-10 space-y-4">
        {/* Card Settings */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase tracking-wider">تنظیمات کارت</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">مسدودسازی موقت کارت</span>
                    </div>
                    <Switch />
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Bell className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">پیامک تراکنش</span>
                    </div>
                    <Switch defaultChecked />
                </div>
            </div>
        </div>

        {/* General Menu */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <Link to="/profile/info">
                <MenuItem icon={User} label="اطلاعات کاربری" />
            </Link>
            <div className="h-px bg-slate-50 mx-14"></div>
            <Link to="/profile/security">
                <MenuItem icon={Shield} label="امنیت و رمز عبور" />
            </Link>
            <div className="h-px bg-slate-50 mx-14"></div>
            <Link to="/profile/settings">
                <MenuItem icon={Settings} label="تنظیمات برنامه" />
            </Link>
            <div className="h-px bg-slate-50 mx-14"></div>
            <MenuItem icon={HelpCircle} label="پشتیبانی و قوانین" />
        </div>

        <Button variant="ghost" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 h-12 gap-2">
            <LogOut className="w-5 h-5" />
            خروج از حساب کاربری
        </Button>
        
        <p className="text-center text-[10px] text-slate-400 mt-4">نسخه ۱.۰.۰</p>
      </div>
    </div>
  );
}

function MenuItem({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <div className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
                <div className="text-slate-400">
                    <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-slate-700">{label}</span>
            </div>
            <ChevronLeft className="w-5 h-5 text-slate-300" />
        </div>
    )
}
