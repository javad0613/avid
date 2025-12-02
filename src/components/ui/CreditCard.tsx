import { motion } from "framer-motion";

interface CreditCardProps {
  name: string;
  number: string;
  expiry: string;
  org: string;
  className?: string;
}

export function CreditCard({ name, number, expiry, org, className }: CreditCardProps) {
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative w-full aspect-[1.586] rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl overflow-hidden p-6 flex flex-col justify-between ${className}`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute -left-10 -bottom-10 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
      </div>

      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg tracking-wider">POROSHA</h3>
          <p className="text-xs text-slate-400 mt-1">{org}</p>
        </div>
        <div className="flex items-center gap-2">
             {/* Contactless Icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                <path d="M8.5 14.5C8.5 14.5 10 13 12 13C14 13 15.5 14.5 15.5 14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M5.5 11.5C5.5 11.5 8.5 8.5 12 8.5C15.5 8.5 18.5 11.5 18.5 11.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M2.5 8.5C2.5 8.5 7 4.5 12 4.5C17 4.5 21.5 8.5 21.5 8.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-9 bg-yellow-500/20 rounded-md border border-yellow-500/40 flex items-center justify-center">
                 <div className="w-8 h-6 bg-yellow-400 rounded-sm opacity-80"></div>
             </div>
        </div>
        <div className="font-mono text-xl sm:text-2xl tracking-widest mb-4" dir="ltr">
          {number}
        </div>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-slate-400 uppercase">نام دارنده کارت</p>
            <p className="font-medium tracking-wide">{name}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase">انقضا</p>
            <p className="font-mono font-medium">{expiry}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
