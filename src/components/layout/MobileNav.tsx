import { Link, useLocation } from "react-router-dom";
import { Home, CreditCard, Store, Wallet, User, ScanLine } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: "خانه", path: "/home" },
    { icon: CreditCard, label: "تراکنش‌ها", path: "/transactions" },
    // Middle placeholder for FAB
    { icon: null, label: "", path: "" }, 
    { icon: Wallet, label: "کیف پول", path: "/wallet" },
    { icon: User, label: "پروفایل", path: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 px-4 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto h-16 relative">
        
        {/* Floating Action Button for Scan */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2">
            <Link to="/scan-qr" className="flex flex-col items-center gap-1">
                <div className="w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/40 flex items-center justify-center text-white hover:scale-105 transition-transform">
                    <ScanLine size={24} />
                </div>
                <span className="text-[10px] font-medium text-slate-500">اسکن</span>
            </Link>
        </div>

        {navItems.map((item, index) => {
          if (!item.icon) return <div key={index} className="w-12" />; // Spacer

          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full gap-1 transition-colors",
                isActive ? "text-primary" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
