import 'dotenv/config'; // <-- WAJIB TARUH DI BARIS NOMOR 1 PALING ATAS!
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  await app.listen(3000); // Sesuaikan port yang lu pakai kemarin
  console.log(`Backend run on port 3000`);
}
bootstrap();