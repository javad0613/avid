export interface CreditRequest {
    id: string;
    planId: string;
    planName: string;
    amount: number;
    duration: number;
    status: 'pending' | 'approved' | 'rejected';
    date: string;
    trackingCode: string;
}

export interface Transaction {
    id: number;
    merchant: string;
    logo: string;
    amount: number;
    date: string;
    type: string;
    category: string;
    cashback: number;
    cashbackPercent: number;
    points: number;
    status: string;
}
