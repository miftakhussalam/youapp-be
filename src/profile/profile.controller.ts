import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get(':userId')
  async findByUser(@Param('userId') userId: string) {
    return this.profileService.findByUser(userId);
  }

  @Patch(':userId')
  async update(@Param('userId') userId: string, @Body() updateDto: Partial<CreateProfileDto>) {
    return this.profileService.update(userId, updateDto);
  }

  @Delete(':userId')
  async remove(@Param('userId') userId: string) {
    return this.profileService.remove(userId);
  }
}
