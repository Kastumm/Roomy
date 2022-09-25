import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, Length } from 'class-validator';
import mongoose from 'mongoose';

export class CreateUserDto {
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @Length(6, 32)
  readonly username: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @Length(6, 32)
  readonly password: string;

  @ApiProperty()
  @IsBoolean()
  readonly isAdmin: boolean;
}
