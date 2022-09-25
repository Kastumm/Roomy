import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/user.schema';
import { Admin } from 'src/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UserDTO } from './dto/user-dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @ApiQuery({})
  @Admin(true)
  @Get()
  getAllUsers(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  // @Admin(true)
  @Get(':id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.usersService.getUserById(id);
  }

  @Get("/find/:email")
  getUserByEmail(@Param('email') email:string):Promise<UserDTO>{
    return this.usersService.finndOneByEmail(email)
  }
}
