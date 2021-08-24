import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthSocketAdapter } from '../auth-socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new AuthSocketAdapter(app));
  await app.listen(3000);
}
bootstrap();
