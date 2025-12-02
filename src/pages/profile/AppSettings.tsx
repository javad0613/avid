import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, Moon, Bell, Globe, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function AppSettings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 p-4 flex items-center gap-2 sticky top-0 z-10 shadow-sm border-b dark:border-slate-800">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <h1 className="font-bold text-lg">تنظیمات برنامه</h1>
      </div>

      <div className="p-6 space-y-6">
        {/* Appearance */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden border dark:border-slate-800">
            <div className="p-4 flex items-center justify-between border-b border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-lg">
                        {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </div>
                    <span className="font-medium text-sm">حالت شب (Dark Mode)</span>
                </div>
                <Switch 
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
            </div>
            <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg">
                        <Globe className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">زبان برنامه</span>
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">فارسی</span>
            </div>
        </div>

        {/* Notifications */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden border dark:border-slate-800">
            <div className="p-4 border-b border-slate-50 dark:border-slate-800">
                <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-primary" />
                    مدیریت اعلان‌ها
                </h3>
            </div>
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">پیامک تراکنش‌ها</span>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">پیشنهادات ویژه</span>
                    <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">یادآوری اقساط</span>
                    <Switch defaultChecked />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
