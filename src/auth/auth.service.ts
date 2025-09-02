import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { Profile, ProfileDocument } from 'src/profile/schemas/profile.schema';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
    private jwtService: JwtService,
  ) { }

  async register(createUserDto: CreateUserDto) {
    const { password, ...otherData } = createUserDto;
    const hashed = await bcrypt.hash(createUserDto.password, 10);
    const newUser = new this.userModel({ ...createUserDto, password: hashed });
    const profile = new this.profileModel(otherData);
    await newUser.save();
    await profile.save();
    return { message: 'User registered', user: newUser };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });
    if (!user) throw { message: 'User not found', statusCode: 401 };

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) throw { message: 'Invalid credentials', statusCode: 401 };

    const payload = { email: user.email, sub: user.username };
    const token = await this.jwtService.signAsync(payload);

    return { access_token: token, user };
  }
}
