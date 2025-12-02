import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://s.api.ir";
const API_KEY = import.meta.env.VITE_API_KEY;

// Helper to check if we are in mock mode
const isMockMode = !API_KEY || API_KEY.includes("YOUR_API_KEY") || API_KEY.includes("****");

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export const apiService = {
  // --- Bills ---
  
  async inquirePowerBill(billID: string) {
    if (isMockMode) {
      await new Promise(r => setTimeout(r, 1500));
      return {
        success: true,
        data: {
          billID,
          payID: "987654321",
          amount: 150000,
          date: "1403/08/01",
          info: { ownerName: "مشترک برق", address: "تهران، خیابان ولیعصر" }
        }
      };
    }
    return this.postRequest('/api/sw1/PowerBillInfo', { billID });
  },

  async inquireWaterBill(billID: string) {
    if (isMockMode) {
      await new Promise(r => setTimeout(r, 1500));
      return {
        success: true,
        data: {
          billID,
          payID: "123456789",
          amount: 45000,
          date: "1403/08/05",
          info: { ownerName: "مشترک آب", address: "تهران، خیابان ولیعصر" }
        }
      };
    }
    return this.postRequest('/api/sw1/WatterBillInfo', { billID });
  },

  async inquireGasBill(billID: string) {
    if (isMockMode) {
      await new Promise(r => setTimeout(r, 1500));
      return {
        success: true,
        data: {
          billID,
          payID: "456123789",
          amount: 85000,
          date: "1403/08/10",
          info: { ownerName: "مشترک گاز", address: "تهران، خیابان ولیعصر" }
        }
      };
    }
    return this.postRequest('/api/sw1/GasBillInfo', { billID });
  },

  // --- Car Services ---

  async inquireVehicleViolation(nationalCode: string, mobile: string, plate: string) {
    if (isMockMode) {
      await new Promise(r => setTimeout(r, 2000));
      return {
        success: true,
        data: {
          plate,
          totalAmount: 500000,
          count: 2,
          details: [
            { type: "سرعت غیرمجاز", amount: 200000, date: "1403/07/20", location: "اتوبان همت" },
            { type: "طرح ترافیک", amount: 300000, date: "1403/08/01", location: "مرکز شهر" }
          ]
        }
      };
    }
    // Note: The real API returns a single object or list structure depending on the provider.
    // We map it to a standard response here if needed.
    return this.postRequest('/api/sw1/VehicleViolation', { nationalCode, mobile, plate });
  },

  // --- Validation ---

  async shahkarValidation(nationalCode: string, mobile: string) {
    if (isMockMode) {
      await new Promise(r => setTimeout(r, 1000));
      return { success: true, data: true };
    }
    return this.postRequest('/api/sw1/Shahkar', { nationalCode, mobile });
  },

  // --- Internal Fetch Wrapper ---

  async postRequest<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || data.error || 'خطا در برقراری ارتباط');
      }

      return data;
    } catch (error: any) {
      console.error(`API Error (${endpoint}):`, error);
      toast.error(error.message || "خطا در دریافت اطلاعات");
      return { success: false, message: error.message };
    }
  }
};
