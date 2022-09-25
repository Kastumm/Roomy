import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { JwtToken } from 'src/auth/models/jwttoken.model';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<JwtToken> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async addUser(@Body() addUserDto: CreateUserDto): Promise<JwtToken> {
    return await this.authService.signup(addUserDto);
  }
}
