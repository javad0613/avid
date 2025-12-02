import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Camera, Save } from "lucide-react";
import { currentUser } from "@/lib/data";

export default function UserInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(-1);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-2 sticky top-0 z-10 shadow-sm">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ChevronRight className="w-6 h-6" />
        </Button>
        <h1 className="font-bold text-lg">اطلاعات کاربری</h1>
      </div>

      <div className="p-6 space-y-8">
        {/* Avatar */}
        <div className="flex flex-col items-center">
            <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>AM</AvatarFallback>
                </Avatar>
                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors">
                    <Camera className="w-4 h-4" />
                </button>
            </div>
            <p className="mt-4 text-sm text-slate-500">عکس پروفایل خود را تغییر دهید</p>
        </div>

        {/* Form */}
        <div className="space-y-4 bg-white p-6 rounded-2xl shadow-sm">
            <div className="space-y-2">
                <Label htmlFor="name">نام و نام خانوادگی</Label>
                <Input id="name" defaultValue={currentUser.name} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="org">سازمان</Label>
                <Input id="org" defaultValue={currentUser.org} disabled className="bg-slate-50" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="phone">شماره موبایل</Label>
                <Input id="phone" defaultValue="09123456789" dir="ltr" className="text-left" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="email">ایمیل</Label>
                <Input id="email" defaultValue="ali.mohammadi@avid.ir" dir="ltr" className="text-left" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="national-id">کد ملی</Label>
                <Input id="national-id" defaultValue="0012345678" disabled className="bg-slate-50 text-left" dir="ltr" />
            </div>
        </div>

        <Button className="w-full h-12 rounded-xl gap-2" onClick={handleSave} disabled={loading}>
            <Save className="w-4 h-4" />
            {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
        </Button>
      </div>
    </div>
  );
}
