import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateRoomDto {
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(2)
  readonly capacity: number;

  appointments:number;
}
