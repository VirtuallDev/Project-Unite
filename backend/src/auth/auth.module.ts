import { Module, MiddlewareConsumer, } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { HttpModule } from '@nestjs/axios';
import { RecaptchaMiddleware } from 'src/middlewares/recaptcha.middleware';

@Module({
  imports: [UsersModule, HttpModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule{
}
