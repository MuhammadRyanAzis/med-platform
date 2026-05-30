'use client';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { LogOut, Activity, ShoppingBag, User, Calendar, MessageSquare, Database, Users } from 'lucide-react';

export default function Navbar() {
    const { token, role, nama, logout } = useAuthStore();
    const [mounted, setMounted] = useState(false);

    // Memastikan komponen baru dirender SETELAH terpasang di browser (Client-Side)
    useEffect(() => {
        setMounted(true);
    }, []);

    // Jika belum mounted (masih proses SSR/Server), jangan rendernya HTML apa pun dulu
    if (!mounted) return null;

    // Jika sudah di browser tapi tidak ada token (belum login), sembunyikan navbar
    if (!token) return null;

    return (
        <nav className="bg-blue-600 text-white shadow-md px-6 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-wide">
                <Activity className="h-6 w-6" /> Hospa Medical Centre
            </Link>

            <div className="flex items-center gap-6">
                <span className="text-sm bg-blue-700 px-3 py-1 rounded-full font-medium">
                    Halo, {nama} ({role})
                </span>

                {/* MENU PASIEN */}
                {role === 'PASIEN' && (
                    <>
                        <Link href="/pasien/profile" className="flex items-center gap-1 hover:underline">
                            <User size={18} /> Profil
                        </Link>
                        <Link href="/pasien/obat" className="flex items-center gap-1 hover:underline">
                            <ShoppingBag size={18} /> Beli Obat
                        </Link>
                        <Link href="/pasien/janji-temu" className="flex items-center gap-1 hover:underline">
                            <Calendar size={18} /> Janji Temu
                        </Link>
                    </>
                )}

                {/* MENU DOKTER */}
                {role === 'DOKTER' && (
                    <>
                        <Link href="/dokter/chat" className="flex items-center gap-1 hover:underline">
                            <MessageSquare size={18} /> Konsultasi Pasien
                        </Link>
                        <Link href="/dokter/janji-temu" className="flex items-center gap-1 hover:underline">
                            <Calendar size={18} /> Jadwal Janji Temu
                        </Link>
                        <Link href="/dokter/obat" className="flex items-center gap-1 hover:underline">
                            <Database size={18} /> Master Obat
                        </Link>
                    </>
                )}

                {/* MENU ADMIN */}
                {role === 'ADMIN' && (
                    <>
                        <Link href="/admin/kelola-dokter" className="flex items-center gap-1 hover:underline">
                            <Users size={18} /> Kelola Data Dokter
                        </Link>
                        <Link href="/admin/kelola-obat" className="flex items-center gap-1 hover:underline">
                            <Database size={18} /> Kontrol Master Obat
                        </Link>
                    </>
                )}

                <button
                    onClick={logout}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded text-sm font-semibold transition"
                >
                    <LogOut size={16} /> Keluar
                </button>
            </div>
        </nav>
    );
}