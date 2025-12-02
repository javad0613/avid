// Mock Data for Porosha Application (Persian)

export const currentUser = {
  name: "علی محمدی",
  org: "پروشا",
  balance: 12500000, // Tomans
  limit: 50000000, // Tomans
  points: 2450,
  cashback: 1200000,
  cardNumber: "1234  5678  9012  3456",
  expiry: "1405/02",
  nationalCode: "0010007700",
  mobile: "09120000000"
};

export const cards = [
  {
    id: 1,
    type: "main",
    name: "علی محمدی",
    number: "1234  5678  9012  3456",
    expiry: "1405/02",
    org: "پروشا",
    balance: 12500000,
    limit: 50000000,
    theme: "from-slate-900 via-slate-800 to-slate-900"
  },
  {
    id: 2,
    type: "secondary",
    name: "علی محمدی",
    number: "9876  5432  1098  7654",
    expiry: "1406/08",
    org: "کیف پول شخصی",
    balance: 2500000,
    limit: 0,
    theme: "from-blue-600 via-blue-500 to-blue-700"
  },
  {
    id: 3,
    type: "family",
    name: "کارت خانواده",
    number: "4567  8901  2345  6789",
    expiry: "1404/11",
    org: "مشترک",
    balance: 800000,
    limit: 5000000,
    theme: "from-emerald-600 via-emerald-500 to-emerald-700"
  }
];

export const transactions = [
  {
    id: 1,
    merchant: "فروشگاه افق کوروش",
    logo: "🛒",
    amount: 850000,
    date: "1403/08/12 - 18:30",
    type: "POS",
    category: "خواربار",
    cashback: 17000,
    cashbackPercent: 2,
    points: 85,
    status: "completed"
  },
  {
    id: 2,
    merchant: "دیجی‌کالا",
    logo: "🛍️",
    amount: 3200000,
    date: "1403/08/10 - 14:15",
    type: "Online",
    category: "الکترونیک",
    cashback: 64000,
    cashbackPercent: 2,
    points: 320,
    status: "completed"
  },
  {
    id: 3,
    merchant: "اسنپ فود",
    logo: "🍔",
    amount: 450000,
    date: "1403/08/09 - 20:00",
    type: "Online",
    category: "غذا",
    cashback: 9000,
    cashbackPercent: 2,
    points: 45,
    status: "completed"
  },
  {
    id: 4,
    merchant: "کافه لمیز",
    logo: "☕",
    amount: 120000,
    date: "1403/08/08 - 09:30",
    type: "QR",
    category: "رستوران",
    cashback: 2400,
    cashbackPercent: 2,
    points: 12,
    status: "completed"
  }
];

export const cashbackHistory = [
  {
    id: 1,
    source: "خرید از افق کوروش",
    date: "1403/08/12",
    amount: 17000,
    percent: 2,
    status: "received"
  },
  {
    id: 2,
    source: "خرید از دیجی‌کالا",
    date: "1403/08/10",
    amount: 64000,
    percent: 2,
    status: "received"
  },
  {
    id: 3,
    source: "پاداش کمپین پاییزه",
    date: "1403/08/01",
    amount: 50000,
    percent: 0,
    status: "bonus"
  }
];

export const pointsHistory = [
  {
    id: 1,
    action: "تراکنش خرید",
    merchant: "دیجی‌کالا",
    date: "1403/08/10",
    points: 320,
    type: "earn"
  },
  {
    id: 2,
    action: "دعوت از دوستان",
    merchant: "-",
    date: "1403/08/05",
    points: 500,
    type: "earn"
  },
  {
    id: 3,
    action: "تبدیل به شارژ کیف پول",
    merchant: "-",
    date: "1403/07/28",
    points: -1000,
    type: "redeem"
  }
];

export const merchants = [
  {
    id: 1,
    name: "هایپراستار",
    category: "خواربار",
    discount: "۵٪ تخفیف",
    cashback: "۲٪ بازگشت وجه",
    image: "https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/orange/white?text=Hyper"
  },
  {
    id: 2,
    name: "تکنولایف",
    category: "الکترونیک",
    discount: "تا ۱۰٪ تخفیف",
    cashback: "۱٪ بازگشت وجه",
    image: "https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/blue/white?text=Techno"
  },
  {
    id: 3,
    name: "شهر کتاب",
    category: "فرهنگی",
    discount: "۱۵٪ تخفیف",
    cashback: "۵٪ بازگشت وجه",
    image: "https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/brown/white?text=Book"
  },
  {
    id: 4,
    name: "بانی مد",
    category: "پوشاک",
    discount: "۲۰٪ تخفیف",
    cashback: "۳٪ بازگشت وجه",
    image: "https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/100x100/green/white?text=Bani"
  }
];

export const instalments = [
  {
    id: 1,
    title: "خرید لپ‌تاپ مک‌بوک",
    merchant: "دیجی‌کالا",
    totalAmount: 60000000,
    remainingAmount: 45000000,
    totalInstallments: 12,
    remainingInstallments: 9,
    nextDueDate: "1403/09/01",
    monthlyPayment: 5000000
  },
  {
    id: 2,
    title: "مبلمان اداری",
    merchant: "ایران میز",
    totalAmount: 20000000,
    remainingAmount: 5000000,
    totalInstallments: 4,
    remainingInstallments: 1,
    nextDueDate: "1403/08/25",
    monthlyPayment: 5000000
  }
];

export const notifications = [
  {
    id: 1,
    title: "پیشنهاد ویژه افق کوروش",
    message: "با خرید بالای ۵۰۰ هزار تومان، ۵۰ هزار تومان کش‌بک اضافی دریافت کنید.",
    date: "۱ ساعت پیش",
    type: "offer",
    read: false
  },
  {
    id: 2,
    title: "قسط وام پرداخت شد",
    message: "قسط ماه آبان وام بانک ملت با موفقیت پرداخت شد.",
    date: "دیروز",
    type: "success",
    read: true
  },
  {
    id: 3,
    title: "هشدار امنیتی",
    message: "ورود جدید به حساب کاربری شما با دستگاه ناشناس.",
    date: "۲ روز پیش",
    type: "alert",
    read: true
  },
  {
    id: 4,
    title: "امتیاز جدید",
    message: "تبریک! شما وارد سطح طلایی شدید.",
    date: "۳ روز پیش",
    type: "info",
    read: true
  }
];
