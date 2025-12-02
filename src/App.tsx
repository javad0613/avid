import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { MobileNav } from "@/components/layout/MobileNav";
import { Toaster } from "@/components/ui/sonner";
import Onboarding from "@/pages/Onboarding";
import Home from "@/pages/Home";
import Transactions from "@/pages/Transactions";
import Marketplace from "@/pages/Marketplace";
import Wallet from "@/pages/Wallet";
import Profile from "@/pages/Profile";
import MerchantDashboard from "@/pages/MerchantDashboard";
import RequestCredit from "@/pages/RequestCredit";
import ScanQR from "@/pages/ScanQR";
import UserInfo from "@/pages/profile/UserInfo";
import Security from "@/pages/profile/Security";
import AppSettings from "@/pages/profile/AppSettings";
import Cashback from "@/pages/Cashback";
import Points from "@/pages/Points";
import Notifications from "@/pages/Notifications";
import CreditHistory from "@/pages/CreditHistory";
import Bills from "@/pages/Bills";
import CarServices from "@/pages/CarServices";
import Recharge from "@/pages/Recharge";
import AddCard from "@/pages/AddCard";

function AppContent() {
  const location = useLocation();
  
  // Logic to hide nav:
  const hideNavRoutes = ["/", "/merchant", "/scan-qr", "/request-credit", "/add-card"];
  const showNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen flex justify-center transition-colors duration-300">
      {/* Mobile Container Simulation */}
      <div className={`w-full ${location.pathname === '/merchant' ? 'max-w-full' : 'max-w-md'} bg-white dark:bg-slate-900 min-h-screen shadow-2xl relative overflow-x-hidden transition-colors duration-300`}>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/merchant" element={<MerchantDashboard />} />
          <Route path="/request-credit" element={<RequestCredit />} />
          <Route path="/scan-qr" element={<ScanQR />} />
          <Route path="/notifications" element={<Notifications />} />
          
          {/* New Pages */}
          <Route path="/cashback" element={<Cashback />} />
          <Route path="/points" element={<Points />} />
          <Route path="/credit-history" element={<CreditHistory />} />
          <Route path="/add-card" element={<AddCard />} />
          
          {/* Service Pages */}
          <Route path="/bills" element={<Bills />} />
          <Route path="/car-services" element={<CarServices />} />
          <Route path="/recharge" element={<Recharge />} />
          
          {/* Profile Sub-routes */}
          <Route path="/profile/info" element={<UserInfo />} />
          <Route path="/profile/security" element={<Security />} />
          <Route path="/profile/settings" element={<AppSettings />} />
        </Routes>
        {showNav && <MobileNav />}
        <Toaster />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
