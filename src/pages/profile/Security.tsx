import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, ShieldCheck, Smartphone, KeyRound } from "lucide-react";

export default function Security() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-white p-4 flex items-center gap-2 sticky top-0 z-10 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <h1 className="font-bold text-lg">امنیت و رمز عبور</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Biometric */}
        <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                    <p className="font-medium text-sm">ورود با اثر انگشت</p>
                    <p className="text-xs text-slate-500">استفاده از بیومتریک برای ورود سریع</p>
                </div>
            </div>
            <Switch defaultChecked />
        </div>

        {/* Change Password */}
        <div className="bg-white p-6 rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 mb-2">
                <KeyRound className="w-5 h-5 text-primary" />
                <h3 className="font-bold text-slate-900">تغییر رمز عبور</h3>
            </div>
            
            <div className="space-y-2">
                <Label>رمز عبور فعلی</Label>
                <Input type="password" />
            </div>
            <div className="space-y-2">
                <Label>رمز عبور جدید</Label>
                <Input type="password" />
            </div>
            <div className="space-y-2">
                <Label>تکرار رمز عبور جدید</Label>
                <Input type="password" />
            </div>
            <Button variant="outline" className="w-full">تغییر رمز</Button>
        </div>

        {/* Active Sessions */}
        <div>
            <h3 className="text-sm font-bold text-slate-500 mb-3 px-2">نشست‌های فعال</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="p-4 flex items-center justify-between border-b border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <Smartphone className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">iPhone 13 Pro</p>
                            <p className="text-xs text-green-600">دستگاه فعلی</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-100 rounded-lg">
                            <Smartphone className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                            <p className="font-medium text-sm">Samsung S21</p>
                            <p className="text-xs text-slate-400">آخرین بازدید: دیروز</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 text-xs">خروج</Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
