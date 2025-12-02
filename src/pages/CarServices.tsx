import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Car, AlertTriangle, Loader2, CheckCircle2 } from "lucide-react";
import { apiService } from "@/services/apiService";
import { currentUser } from "@/lib/data";
import { toast } from "sonner";

export default function CarServices() {
  const navigate = useNavigate();
  const [plate, setPlate] = useState("11ب222ایران33");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [paid, setPaid] = useState(false);

  const handleInquire = async () => {
    setLoading(true);
    setResult(null);
    setPaid(false);

    try {
      const res = await apiService.inquireVehicleViolation(currentUser.nationalCode, currentUser.mobile, plate);
      if (res.success && res.data) {
        setResult(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPaid(true);
      toast.success("جریمه‌ها با موفقیت پرداخت شد");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-in fade-in duration-500">
      <div className="bg-white p-4 flex items-center gap-2 sticky top-0 z-10 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <h1 className="font-bold text-lg">خدمات خودرو (خلافی)</h1>
      </div>

      <div className="p-4 space-y-6">
        <Card className="border-none shadow-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                <Car className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-sm text-slate-500">استعلام خلافی و عوارض</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">شماره پلاک</label>
              <div className="flex items-center gap-2" dir="ltr">
                <div className="bg-blue-800 text-white px-2 py-3 rounded-l-md text-xs flex flex-col items-center justify-center w-10">
                    <span>I.R.</span>
                    <span>IRAN</span>
                </div>
                <Input 
                  value={plate}
                  onChange={(e) => setPlate(e.target.value)}
                  className="text-center font-bold text-lg h-12 rounded-l-none border-l-0"
                />
              </div>
              <p className="text-[10px] text-slate-400 text-right">مثال: 11ب222ایران33</p>
            </div>

            <Button className="w-full h-12 rounded-xl" onClick={handleInquire} disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "استعلام خلافی"}
            </Button>
          </CardContent>
        </Card>

        {result && (
          <div className="space-y-4 animate-in slide-in-from-bottom-4">
            {paid ? (
               <Card className="bg-green-50 border-green-100">
                 <CardContent className="p-6 flex flex-col items-center text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-600 mb-3" />
                    <h3 className="font-bold text-lg text-green-800">پرداخت موفق</h3>
                    <p className="text-sm text-green-700">تمام جرایم خودرو شما تسویه شد.</p>
                 </CardContent>
               </Card>
            ) : (
              <>
                <div className="flex justify-between items-center px-2">
                    <h3 className="font-bold text-slate-900">لیست تخلفات</h3>
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-bold">
                        {result.count} مورد
                    </span>
                </div>

                {/* Mock Details for Demo if not present in API response */}
                {(result.details || []).map((item: any, idx: number) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <p className="font-bold text-sm text-slate-900">{item.type || "تخلف رانندگی"}</p>
                                <p className="text-[10px] text-slate-400">{item.date} - {item.location}</p>
                            </div>
                        </div>
                        <p className="font-bold text-slate-900">{item.amount?.toLocaleString('fa-IR')}</p>
                    </div>
                ))}

                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 z-20 max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-slate-500">مجموع قابل پرداخت:</span>
                        <span className="font-bold text-lg">{result.totalAmount?.toLocaleString('fa-IR')} تومان</span>
                    </div>
                    <Button className="w-full h-12 rounded-xl bg-red-600 hover:bg-red-700" onClick={handlePay} disabled={loading}>
                        {loading ? "در حال پردازش..." : "پرداخت آنلاین"}
                    </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
