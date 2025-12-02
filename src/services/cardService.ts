import { cards as initialCards } from "@/lib/data";

export interface CardData {
  id: number;
  type: string;
  name: string;
  number: string;
  expiry: string;
  org: string;
  balance: number;
  limit: number;
  theme: string;
}

const STORAGE_KEY = "porosha_cards";

export const cardService = {
  getCards: (): CardData[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with mock data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCards));
    return initialCards;
  },

  addCard: (card: Omit<CardData, "id" | "type" | "balance" | "limit">) => {
    const currentCards = cardService.getCards();
    const newCard: CardData = {
      ...card,
      id: Date.now(),
      type: "secondary",
      balance: 0, // Default balance for new cards
      limit: 0,
    };
    
    const updatedCards = [...currentCards, newCard];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCards));
    return newCard;
  }
};
