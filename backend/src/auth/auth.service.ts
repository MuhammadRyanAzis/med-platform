import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async registerPasien(data: any) {
        const userExists = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (userExists) throw new BadRequestException('Email sudah terdaftar di sistem!');

        const hashedPassword = await bcrypt.hash(data.password, 10);

        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: data.email,
                    password: hashedPassword,
                    nama: data.nama,
                    role: 'PASIEN',
                },
            });

            await tx.profilPasien.create({
                data: {
                    userId: user.id,
                    nomorTelepon: data.nomorTelepon || '',
                    alamat: data.alamat || '',
                },
            });

            return { message: 'Registrasi akun pasien berhasil!' };
        });
    }

    async login(data: any) {
        const user = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (!user) throw new UnauthorizedException('Email atau password salah!');

        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch) throw new UnauthorizedException('Email atau password salah!');

        const payload = { id: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            role: user.role,
            nama: user.nama,
        };
    }
}