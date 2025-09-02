import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Headers,
  UnauthorizedException,
  Put,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('api')
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly jwtService: JwtService,
  ) { }

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Get('getProfile')
  async getProfile(@Headers('x-access-token') token: string) {
    if (!token) {
      throw new UnauthorizedException('No access token provided');
    }

    try {
      const decoded = this.jwtService.verify(token);

      // ⚡ Best practice: store email in JWT payload (e.g., decoded.email)
      const email = decoded.email;
      if (!email) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const profile = await this.profileService.findByEmail(email);

      if (!profile) {
        throw new UnauthorizedException('Profile not found');
      }

      return {
        message: "Profile has been f ound successfully",
        data: profile
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  @Get('profile/:email')
  async findByEmail(@Param('email') email: string) {
    return this.profileService.findByEmail(email);
  }

  @Put('updateProfile')
  async update(
    @Headers('x-access-token') token: string,
    // @Body() updateDto: Partial<CreateProfileDto>,
    @Body() updateDto: any,
  ) {
    if (!token) {
      throw new UnauthorizedException('No access token provided');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const email = decoded.email;
      if (!email) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const profile = await this.profileService.update(email, updateDto);

      return {
        message: "Profile updated successfully",
        data: profile
      };
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  @Delete('profile/:email')
  async remove(@Param('email') email: string) {
    return this.profileService.remove(email);
  }
}
