import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtToken } from 'src/auth/models/jwttoken.model';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginValidationDto } from './dto/login-validation.dto';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService) {}

  async validateUser(loginDto: LoginValidationDto): Promise<User> {
    const user = await this.userService.findOne(loginDto.email);
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    const isPasswordMatching = bcrypt.compareSync(loginDto.password, user.password);
    if (!isPasswordMatching) {
      throw new BadRequestException('Invalid email or password');
    }
    if (isPasswordMatching) {
      return user;
    }
  }

  generateJwtToken(user: { _id: mongoose.Schema.Types.ObjectId; email: string; isAdmin: boolean; username:string }): string {
    const payload = { id: user._id, email: user.email, isAdmin: user.isAdmin, username: user.username };
    return this.jwtService.sign(payload);
  }

  async login(user: User): Promise<JwtToken> {
    return {
      access_token: this.generateJwtToken(user),
    };
  }

  async signup(userDto: CreateUserDto): Promise<JwtToken> {
    const user = await this.userService.createUser(userDto);
    return {
      access_token: this.generateJwtToken(user),
    };
  }
}
