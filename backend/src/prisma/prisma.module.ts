
import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // <-- Dekorator ini bikin PrismaService bisa diakses di seluruh module backend lu tanpa perlu di-import manual satu-satu
@Module({
    providers: [PrismaService],
    exports: [PrismaService], // <-- WAJIB diekspor agar dibagikan ke module lain
})
export class PrismaModule { }