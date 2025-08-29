import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { User, UserSchema } from '../users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({ secret: 'secretKey' }), // ganti sesuai env
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule { }
