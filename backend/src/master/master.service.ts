import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MasterService {
    constructor(private prisma: PrismaService) { }

    async getProfilPasien(userId: number) {
        const profil = await this.prisma.profilPasien.findUnique({
            where: { userId: Number(userId) },
            include: { user: true },
        });
        if (!profil) throw new NotFoundException('Profil pasien tidak ditemukan');
        return profil;
    }

    async updateProfilPasien(userId: number, data: any) {
        return this.prisma.profilPasien.update({
            where: { userId: Number(userId) },
            data: {
                nomorTelepon: data.nomorTelepon,
                alamat: data.alamat,
                user: {
                    update: { nama: data.nama },
                },
            },
            include: { user: true },
        });
    }

    async getDokters(filter: { spesialisasi?: string; hari?: string; jam?: string }) {
        return this.prisma.user.findMany({
            where: {
                role: 'DOKTER',
                profilDokter: {
                    ...(filter.spesialisasi && { spesialisasi: filter.spesialisasi }),
                    ...(filter.hari && { jadwalHari: { contains: filter.hari } }),
                    ...(filter.jam && { jadwalJam: filter.jam }),
                },
            },
            include: { profilDokter: true },
        });
    }

    async getAllObat() {
        return this.prisma.obat.findMany();
    }

    async getObatPasienOnly() {
        return this.prisma.obat.findMany({ where: { kategori: 'NON_RESEP' } });
    }

    async createObat(data: any) {
        return this.prisma.obat.create({
            data: {
                nama: data.nama,
                kategori: data.kategori,
                harga: parseFloat(data.harga),
                stok: parseInt(data.stok),
            },
        });
    }

    async updateObat(id: number, data: any) {
        return this.prisma.obat.update({
            where: { id: Number(id) },
            data: {
                nama: data.nama,
                kategori: data.kategori,
                harga: data.harga ? parseFloat(data.harga) : undefined,
                stok: data.stok ? parseInt(data.stok) : undefined,
            },
        });
    }

    async deleteObat(id: number) {
        return this.prisma.obat.delete({ where: { id: Number(id) } });
    }
}

