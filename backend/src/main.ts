import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000/',
    credentials: true,
    allowedHeaders: ["X-Powered-By"]
  })

  app.getHttpAdapter().getInstance().disable("x-powered-by");
  await app.listen(3000);
}
bootstrap();
