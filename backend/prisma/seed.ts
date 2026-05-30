import 'dotenv/config';

console.log('DATABASE_URL =', process.env.DATABASE_URL);

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Membersihkan database lama...');

    // FIX: Urutan delete dipastikan aman dari Foreign Key Error, menggunakan orderItems (bukan itemOrder)
    await prisma.orderItem.deleteMany({});
    await prisma.transaksi.deleteMany({});
    await prisma.resepDetail.deleteMany({});
    await prisma.resepDigital.deleteMany({});
    await prisma.chat.deleteMany({});
    await prisma.booking.deleteMany({});
    await prisma.obat.deleteMany({});
    await prisma.profilDokter.deleteMany({});
    await prisma.profilPasien.deleteMany({});
    await prisma.user.deleteMany({});

    console.log('🌱 Memulai proses seeding data baru...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. SEED DATA DOKTER
    const dokter1 = await prisma.user.create({
        data: {
            email: 'dr.budi@med.com',
            password: hashedPassword,
            nama: 'dr. Budi Santoso, Sp.A',
            role: 'DOKTER',
            profilDokter: {
                create: {
                    spesialisasi: 'Anak',
                    jadwalHari: 'Senin, Rabu, Jumat',
                    jadwalJam: '09:00 - 13:00',
                    // FIX: Properti 'tarif' dihapus karena tidak ada di schema.prisma
                },
            },
        },
    });

    const dokter2 = await prisma.user.create({
        data: {
            email: 'dr.siti@med.com',
            password: hashedPassword,
            nama: 'dr. Siti Aminah, Sp.PD',
            role: 'DOKTER',
            profilDokter: {
                create: {
                    spesialisasi: 'Penyakit Dalam',
                    jadwalHari: 'Selasa, Kamis',
                    jadwalJam: '14:00 - 17:00',
                    // FIX: Properti 'tarif' dihapus karena tidak ada di schema.prisma
                },
            },
        },
    });

    // 2. SEED DATA MASTER OBAT
    await prisma.obat.createMany({
        data: [
            { nama: 'Paracetamol 500mg', kategori: 'NON_RESEP', harga: 8500, stok: 150 },
            { nama: 'Amoxicillin 500mg', kategori: 'RESEP', harga: 15000, stok: 80 },
            { nama: 'Vitamin C 1000mg', kategori: 'NON_RESEP', harga: 22000, stok: 200 },
            { nama: 'Cefadroxil 500mg', kategori: 'RESEP', harga: 27500, stok: 60 },
        ],
    });

    console.log('✅ Seeding berhasil diselesaikan!');
}

main()
    .catch((e) => {
        console.error('❌ Seeding gagal:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
