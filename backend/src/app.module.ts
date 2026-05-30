import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MasterModule } from './master/master.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    PrismaModule, // <-- Pastikan ini ada di sini!
    AuthModule,
    MasterModule,
    TransactionModule,
  ],
})
export class AppModule { }