import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectToDatabase } from 'db/db_connection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await connectToDatabase();
  await app.listen(3000);
}
bootstrap();
