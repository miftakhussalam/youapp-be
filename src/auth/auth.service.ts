import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const hashed = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({ ...createUserDto, password: hashed });
    await newUser.save();
    return { message: 'User registered', user: newUser };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) return { message: 'User not found' };

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) return { message: 'Invalid credentials' };

    const payload = { email: user.email, sub: user.username };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token, user };
  }
}
