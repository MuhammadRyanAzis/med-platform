import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register-pasien')
    async registerPasien(@Body() body: any) {
        if (body.role && body.role === 'DOKTER') {
            throw new BadRequestException('Pendaftaran akun Dokter secara mandiri dilarang keras!');
        }
        return this.authService.registerPasien(body);
    }

    @Post('login')
    async login(@Body() body: any) {
        return this.authService.login(body);
    }
}

