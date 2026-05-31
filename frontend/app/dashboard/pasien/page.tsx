"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/useAuth";
import { api } from "../../../lib/api";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useToast } from "../../../components/ToastProvider";
import { UserCircle, Phone, MapPin } from "lucide-react";

export default function PasienDashboard() {
  const { user, isLoading: authLoading } = useAuth(["PASIEN"]);
  const { addToast } = useToast();
  
  const [profil, setProfil] = useState({
    nomorTelepon: "",
    alamat: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfil();
    }
  }, [user]);

  const fetchProfil = async () => {
    try {
      const res = await api.get("/master/profil/pasien");
      if (res.data) {
        setProfil({
          nomorTelepon: res.data.nomorTelepon || "",
          alamat: res.data.alamat || "",
        });
      }
    } catch (error) {
      addToast("Gagal mengambil data profil", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put("/master/profil/pasien", profil);
      addToast("Profil berhasil diperbarui", "success");
    } catch (error) {
      addToast("Gagal memperbarui profil", "error");
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return <div className="min-h-screen p-8 text-center text-zinc-500">Memuat dashboard...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900">Dashboard Pasien</h1>
        <p className="mt-2 text-zinc-600">Selamat datang kembali, {user?.nama}!</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-200 bg-zinc-50">
          <h3 className="text-lg font-medium leading-6 text-zinc-900 flex items-center gap-2">
            <UserCircle className="h-5 w-5 text-teal-600" />
            Informasi Profil
          </h3>
        </div>
        <div className="p-6">
          <form onSubmit={handleUpdate} className="space-y-6 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Nama Lengkap</label>
              <Input
                value={user?.nama || ""}
                disabled
                className="bg-zinc-50"
              />
              <p className="mt-1 text-xs text-zinc-500">Nama tidak dapat diubah</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Email</label>
              <Input
                value={user?.email || ""}
                disabled
                className="bg-zinc-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1 flex items-center gap-2">
                <Phone className="h-4 w-4 text-zinc-400" /> Nomor Telepon
              </label>
              <Input
                type="tel"
                value={profil.nomorTelepon}
                onChange={(e) => setProfil({ ...profil, nomorTelepon: e.target.value })}
                placeholder="08123456789"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-zinc-400" /> Alamat Lengkap
              </label>
              <Input
                type="text"
                value={profil.alamat}
                onChange={(e) => setProfil({ ...profil, alamat: e.target.value })}
                placeholder="Jl. Sehat Selalu No. 123"
              />
            </div>

            <div className="pt-4 border-t border-zinc-100">
              <Button type="submit" disabled={saving}>
                {saving ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
