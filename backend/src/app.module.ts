import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RecaptchaMiddleware } from './middlewares/recaptcha.middleware';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from './users/users.module';

@Module({
  imports: [

  AuthModule,
    HttpModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true
  }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RecaptchaMiddleware).forRoutes('/auth/login', '/auth/register');
  }
}
