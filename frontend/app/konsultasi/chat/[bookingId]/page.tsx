"use client";

import { useAuth } from "../../../../lib/useAuth";
import { Button } from "../../../../components/ui/button";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function ChatPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { user, isLoading } = useAuth(["PASIEN", "DOKTER"]);
  const router = useRouter();
  const { bookingId } = use(params);

  if (isLoading) return <div className="p-8 text-center">Memuat ruang chat...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden h-[600px] flex flex-col">
        <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
          <h2 className="font-bold text-lg text-zinc-900">Ruang Konsultasi (Booking #{bookingId})</h2>
          <Button variant="outline" size="sm" onClick={() => router.push(user?.role === 'DOKTER' ? "/dashboard/dokter" : "/dashboard/pasien")}>
            Kembali ke Dashboard
          </Button>
        </div>
        
        <div className="flex-1 p-6 flex items-center justify-center bg-zinc-50/50">
          <div className="text-center">
            <h3 className="text-zinc-500 font-medium mb-2">Halaman Chat Sedang Dalam Pengembangan</h3>
            <p className="text-sm text-zinc-400">Silakan kembali lagi nanti untuk fitur Live Chat.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
