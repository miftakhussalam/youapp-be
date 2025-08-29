import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = new this.profileModel(createProfileDto);
    return profile.save();
  }

  async findByUser(userId: string): Promise<Profile | null> {
    return this.profileModel.findOne({ user: userId }).populate('user').exec();
  }

  async update(userId: string, updateDto: Partial<CreateProfileDto>): Promise<Profile> {
    return this.profileModel
      .findOneAndUpdate({ user: userId }, updateDto, { new: true })
      .exec();
  }

  async remove(userId: string): Promise<any> {
    return this.profileModel.deleteOne({ user: userId }).exec();
  }
}
