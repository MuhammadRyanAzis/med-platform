'use client';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const { token, role } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/login');
        } else if (role === 'PASIEN') {
            router.push('/pasien/profile');
        } else if (role === 'DOKTER') {
            router.push('/dokter/obat');
        }
    }, [token, role, router]);

    return (
        <div className="flex justify-center items-center h-[60vh]">
            <p className="text-gray-500 animate-pulse font-medium">Memuat Otentikasi Alur Layanan...</p>
        </div>
    );
}