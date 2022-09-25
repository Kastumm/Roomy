import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schemas/user.schema';
import mongoose from 'mongoose';
require('dotenv').config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: { _id: mongoose.Schema.Types.ObjectId; email: string; isAdmin: boolean; username:string }): Promise<Partial<User>> {
    const user = await this.userService.findOne(payload.email);
    if (!user) {
      throw new UnauthorizedException('No Access');
    }
    return { _id: user._id, email: user.email, isAdmin: user.isAdmin, username:user.username };
  }
}
