import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) { }

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    const profile = new this.profileModel(createProfileDto);
    return profile.save();
  }

  async findByUser(email: string): Promise<Profile | null> {
    return this.profileModel.findOne({ email }).exec();
  }

  async findByEmail(email: string): Promise<Profile | null> {
    return this.profileModel.findOne({ email }).select('-_id -__v').exec();
  }

  async update(
    email: string,
    updateDto: Partial<CreateProfileDto>,
  ): Promise<Profile | null> {
    const getHoroscope = (birthday: string): string => {
      const [dayStr, monthStr] = birthday.split('/');
      const day = parseInt(dayStr, 10);
      const month = parseInt(monthStr, 10);

      const horoscopes = [
        { sign: 'Capricorn', from: [12, 22], to: [1, 19] },
        { sign: 'Aquarius', from: [1, 20], to: [2, 18] },
        { sign: 'Pisces', from: [2, 19], to: [3, 20] },
        { sign: 'Aries', from: [3, 21], to: [4, 19] },
        { sign: 'Taurus', from: [4, 20], to: [5, 20] },
        { sign: 'Gemini', from: [5, 21], to: [6, 20] },
        { sign: 'Cancer', from: [6, 21], to: [7, 22] },
        { sign: 'Leo', from: [7, 23], to: [8, 22] },
        { sign: 'Virgo', from: [8, 23], to: [9, 22] },
        { sign: 'Libra', from: [9, 23], to: [10, 22] },
        { sign: 'Scorpio', from: [10, 23], to: [11, 21] },
        { sign: 'Sagittarius', from: [11, 22], to: [12, 21] },
      ];

      for (const h of horoscopes) {
        if (
          (month === h.from[0] && day >= h.from[1]) ||
          (month === h.to[0] && day <= h.to[1])
        ) {
          return h.sign;
        }
      }
      return 'Capricorn';
    };

    const getZodiac = (birthday: string): string => {
      const animals = [
        'Monkey',
        'Rooster',
        'Dog',
        'Pig',
        'Rat',
        'Ox',
        'Tiger',
        'Rabbit',
        'Dragon',
        'Snake',
        'Horse',
        'Goat',
      ];
      const year = parseInt(birthday.split('/')[2], 10);
      const index = (year - 1900) % 12;
      return animals[index];
    };

    if (updateDto.birthday) {
      updateDto.horoscope = getHoroscope(updateDto.birthday);
      updateDto.zodiac = getZodiac(updateDto.birthday);
    }
    return this.profileModel
      .findOneAndUpdate({ email }, updateDto, { new: true })
      .exec();
  }

  async remove(email: string): Promise<{ deletedCount?: number }> {
    return this.profileModel.deleteOne({ email }).exec();
  }
}
