import { create } from 'zustand';

interface AuthState {
    token: string | null;
    role: 'PASIEN' | 'DOKTER' | 'ADMIN' | null;
    nama: string | null;
    setAuth: (token: string, role: 'PASIEN' | 'DOKTER' | 'ADMIN', nama: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    role: typeof window !== 'undefined' ? localStorage.getItem('role') as any : null,
    nama: typeof window !== 'undefined' ? localStorage.getItem('nama') : null,

    setAuth: (token, role, nama) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        localStorage.setItem('nama', nama);
        set({ token, role, nama });
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('nama');
        set({ token: null, role: null, nama: null });
        if (typeof window !== 'undefined') {
            window.location.href = '/login';
        }
    },
}));