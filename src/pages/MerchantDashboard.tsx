import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, TrendingUp, Users, DollarSign, Gift } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'شنبه', sales: 4000 },
  { name: 'یک', sales: 3000 },
  { name: 'دو', sales: 2000 },
  { name: 'سه', sales: 2780 },
  { name: 'چهار', sales: 1890 },
  { name: 'پنج', sales: 2390 },
  { name: 'جمعه', sales: 3490 },
];

export default function MerchantDashboard() {
  return (
    <div className="min-h-screen bg-slate-50 p-6" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">پنل پذیرندگان پروشا</h1>
                <p className="text-slate-500">فروشگاه هایپراستار شعبه مرکزی</p>
            </div>
            <Button className="gap-2">
                <QrCode className="w-4 h-4" />
                نمایش QR کد پرداخت
            </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <StatCard title="فروش امروز" value="۱۲,۵۰۰,۰۰۰" unit="تومان" icon={DollarSign} color="text-green-600" />
            <StatCard title="تعداد تراکنش" value="۴۵" unit="عدد" icon={TrendingUp} color="text-blue-600" />
            <StatCard title="مشتریان جدید" value="۱۲" unit="نفر" icon={Users} color="text-purple-600" />
            <StatCard title="تخفیف داده شده" value="۸۵۰,۰۰۰" unit="تومان" icon={Gift} color="text-orange-600" />
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
                <CardHeader>
                    <CardTitle>نمودار فروش هفتگی</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <Tooltip 
                                    cursor={{fill: 'transparent'}}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="sales" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>آخرین تراکنش‌ها</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[1,2,3,4,5].map((i) => (
                            <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0">
                                <div>
                                    <p className="font-medium text-sm">خرید با QR</p>
                                    <p className="text-xs text-slate-400">۱۰ دقیقه پیش</p>
                                </div>
                                <p className="font-bold text-sm">۲۵۰,۰۰۰ تومان</p>
                            </div>
                        ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">مشاهده همه</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, unit, icon: Icon, color }: any) {
    return (
        <Card>
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500 mb-1">{title}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{value} <span className="text-xs font-normal text-slate-400">{unit}</span></h3>
                </div>
                <div className={`p-3 bg-slate-50 rounded-xl ${color}`}>
                    <Icon className="w-6 h-6" />
                </div>
            </CardContent>
        </Card>
    )
}
