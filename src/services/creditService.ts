import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { CreditRequest } from "@/types";

const LOCAL_STORAGE_KEY = "porosha_credit_requests";

// Mock data for initial state
const MOCK_REQUESTS: CreditRequest[] = [
    {
        id: "req_1",
        planId: "basic",
        planName: "طرح پایه",
        amount: 15000000,
        duration: 12,
        status: "rejected",
        date: "1403/07/15",
        trackingCode: "PRS-110022"
    },
    {
        id: "req_2",
        planId: "mellat",
        planName: "بانک ملت",
        amount: 50000000,
        duration: 24,
        status: "approved",
        date: "1403/06/20",
        trackingCode: "PRS-334455"
    }
];

export const creditService = {
    async getRequests(): Promise<CreditRequest[]> {
        if (isSupabaseConfigured()) {
            const { data, error } = await supabase
                .from('credit_requests')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (!error && data) return data as any;
        }

        // Fallback to LocalStorage
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (!stored) {
            // Initialize with mock data if empty
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(MOCK_REQUESTS));
            return MOCK_REQUESTS;
        }
        return JSON.parse(stored);
    },

    async addRequest(request: Omit<CreditRequest, 'id' | 'status' | 'date' | 'trackingCode'>): Promise<CreditRequest> {
        const newRequest: CreditRequest = {
            ...request,
            id: `req_${Date.now()}`,
            status: 'pending',
            date: new Date().toLocaleDateString('fa-IR'),
            trackingCode: `PRS-${Math.floor(100000 + Math.random() * 900000)}`
        };

        if (isSupabaseConfigured()) {
            const { error } = await supabase
                .from('credit_requests')
                .insert([newRequest]);
            
            if (error) console.error("Supabase error:", error);
        }

        // Always save to LocalStorage for immediate UI update in this demo
        const current = await this.getRequests();
        const updated = [newRequest, ...current];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));

        return newRequest;
    }
};
