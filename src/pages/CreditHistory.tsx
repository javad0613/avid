import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Clock, CheckCircle2, XCircle, FileText, Plus } from "lucide-react";
import { creditService } from "@/services/creditService";
import { CreditRequest } from "@/types";
import { cn } from "@/lib/utils";

export default function CreditHistory() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<CreditRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
        const data = await creditService.getRequests();
        setRequests(data);
        setLoading(false);
    };
    loadData();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
        case 'approved':
            return { icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50', label: 'تایید شده' };
        case 'rejected':
            return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'رد شده' };
        default:
            return { icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', label: 'در انتظار بررسی' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
                <ChevronRight className="w-6 h-6" />
            </Button>
            <h1 className="font-bold text-lg">وضعیت اعتبارها</h1>
        </div>
        <Button size="sm" variant="outline" className="gap-2 text-xs" onClick={() => navigate("/request-credit")}>
            <Plus className="w-4 h-4" />
            درخواست جدید
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {loading ? (
            <div className="text-center py-10 text-slate-400">در حال بارگذاری...</div>
        ) : requests.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <p className="text-slate-500 mb-4">هیچ درخواستی ثبت نشده است</p>
                <Button onClick={() => navigate("/request-credit")}>ثبت درخواست جدید</Button>
            </div>
        ) : (
            requests.map((req) => {
                const status = getStatusConfig(req.status);
                const StatusIcon = status.icon;
                
                return (
                    <Card key={req.id} className="border-none shadow-sm overflow-hidden">
                        <div className={cn("h-1 w-full", status.bg.replace('bg-', 'bg-opacity-100 bg-'))}></div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", status.bg)}>
                                        <StatusIcon className={cn("w-5 h-5", status.color)} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{req.planName}</h3>
                                        <p className="text-xs text-slate-500">{req.date}</p>
                                    </div>
                                </div>
                                <span className={cn("text-xs font-medium px-2 py-1 rounded-full", status.bg, status.color)}>
                                    {status.label}
                                </span>
                            </div>
                            
                            <div className="flex justify-between items-center text-sm bg-slate-50 p-3 rounded-xl">
                                <div className="text-center flex-1 border-l border-slate-200">
                                    <p className="text-slate-500 text-xs mb-1">مبلغ</p>
                                    <p className="font-bold text-slate-900">{req.amount.toLocaleString('fa-IR')}</p>
                                </div>
                                <div className="text-center flex-1">
                                    <p className="text-slate-500 text-xs mb-1">مدت</p>
                                    <p className="font-bold text-slate-900">{req.duration} ماه</p>
                                </div>
                            </div>

                            <div className="mt-3 flex justify-between items-center">
                                <p className="text-[10px] text-slate-400">کد پیگیری: <span className="font-mono">{req.trackingCode}</span></p>
                                {req.status === 'pending' && (
                                    <Button variant="link" size="sm" className="text-xs h-auto p-0 text-blue-600">
                                        پیگیری وضعیت
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            })
        )}
      </div>
    </div>
  );
}
