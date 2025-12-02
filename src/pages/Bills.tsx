import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChevronRight, Zap, Droplets, Flame, Loader2, CheckCircle2, Receipt } from "lucide-react";
import { apiService } from "@/services/apiService";
import { toast } from "sonner";

type BillType = "power" | "water" | "gas";

export default function Bills() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<BillType>("power");
  const [billId, setBillId] = useState("");
  const [loading, setLoading] = useState(false);
  const [billData, setBillData] = useState<any>(null);
  const [paid, setPaid] = useState(false);

  const handleInquire = async () => {
    if (billId.length < 6) {
      toast.error("شناسه قبض معتبر نیست");
      return;
    }

    setLoading(true);
    setBillData(null);
    setPaid(false);

    try {
      let res;
      if (activeTab === "power") res = await apiService.inquirePowerBill(billId);
      else if (activeTab === "water") res = await apiService.inquireWaterBill(billId);
      else res = await apiService.inquireGasBill(billId);

      if (res.success && res.data) {
        setBillData(res.data);
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
      toast.success("قبض با موفقیت پرداخت شد");
    }, 1500);
  };

  const getIcon = () => {
    if (activeTab === "power") return <Zap className="w-6 h-6 text-yellow-500" />;
    if (activeTab === "water") return <Droplets className="w-6 h-6 text-blue-500" />;
    return <Flame className="w-6 h-6 text-orange-500" />;
  };

  const getTitle = () => {
    if (activeTab === "power") return "قبض برق";
    if (activeTab === "water") return "قبض آب";
    return "قبض گاز";
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24 animate-in fade-in duration-500">
      <div className="bg-white p-4 flex items-center gap-2 sticky top-0 z-10 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate("/home")}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <h1 className="font-bold text-lg">پرداخت قبوض</h1>
      </div>

      <div className="p-4 space-y-6">
        <Tabs defaultValue="power" onValueChange={(v) => { setActiveTab(v as BillType); setBillData(null); setPaid(false); }} className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-white border border-slate-100 h-12 rounded-xl p-1">
            <TabsTrigger value="power" className="rounded-lg data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700">برق</TabsTrigger>
            <TabsTrigger value="water" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">آب</TabsTrigger>
            <TabsTrigger value="gas" className="rounded-lg data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">گاز</TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                    {getIcon()}
                  </div>
                  <p className="text-sm text-slate-500">استعلام {getTitle()}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">شناسه قبض</label>
                  <Input 
                    placeholder="شناسه قبض را وارد کنید" 
                    className="text-center text-lg tracking-widest h-12"
                    value={billId}
                    onChange={(e) => setBillId(e.target.value)}
                    type="number"
                    dir="ltr"
                  />
                </div>

                <Button className="w-full h-12 rounded-xl" onClick={handleInquire} disabled={loading}>
                  {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "استعلام"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </Tabs>

        {billData && (
          <Card className="border-blue-100 bg-blue-50/30 animate-in slide-in-from-bottom-4">
            <CardContent className="p-5">
              {paid ? (
                <div className="flex flex-col items-center text-center py-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-bold text-lg text-green-700">پرداخت موفق</h3>
                  <p className="text-sm text-slate-500 mt-1">شماره پیگیری: {Math.floor(Math.random() * 1000000)}</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-4 border-b border-blue-100 pb-4">
                    <div className="flex items-center gap-3">
                      <Receipt className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-bold text-sm">{getTitle()}</p>
                        <p className="text-xs text-slate-500">{billData.info?.ownerName}</p>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-lg text-slate-900">{billData.amount?.toLocaleString('fa-IR')} <span className="text-xs font-normal text-slate-500">تومان</span></p>
                      <p className="text-xs text-red-500">پرداخت نشده</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-slate-600 mb-6">
                    <div className="flex justify-between">
                      <span>شناسه قبض:</span>
                      <span className="font-mono">{billData.billID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>شناسه پرداخت:</span>
                      <span className="font-mono">{billData.payID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>مهلت پرداخت:</span>
                      <span>{billData.date}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={handlePay} disabled={loading}>
                    {loading ? "در حال پرداخت..." : "پرداخت قبض"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
