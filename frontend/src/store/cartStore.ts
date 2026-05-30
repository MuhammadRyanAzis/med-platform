import { create } from 'zustand';

export interface CartItem {
    id: number;
    nama: string;
    harga: number;
    jumlah: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'jumlah'>) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
    items: [],
    addItem: (item) => set((state) => {
        const eksis = state.items.find((i) => i.id === item.id);
        if (eksis) {
            return {
                items: state.items.map((i) => i.id === item.id ? { ...i, jumlah: i.jumlah + 1 } : i)
            };
        }
        return { items: [...state.items, { ...item, jumlah: 1 }] };
    }),
    removeItem: (id) => set((state) => ({
        items: state.items.filter((i) => i.id !== id)
    })),
    clearCart: () => set({ items: [] }),
}));