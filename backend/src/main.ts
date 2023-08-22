import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { UniteExceptionFilter } from './exceptions/UniteException.filter';
import UniteException from './exceptions/UniteException';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000/',
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors) => {
      console.log(errors);
      return new UniteException("Validating the given data failed. follow the next list to see why.", 400, {exceptions: errors.map(e => ({
        target: e.property,
        failures: e.constraints
      }))});
    }
  }));


  app.use(cookieParser());
  app.useGlobalFilters(new UniteExceptionFilter());
  app.getHttpAdapter().getInstance().disable("x-powered-by");
  await app.listen(3000);
}
bootstrap();
