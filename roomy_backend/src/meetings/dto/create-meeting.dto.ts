import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString, Length } from 'class-validator';
import mongoose from 'mongoose';
import { Room, User } from 'src/repo/models';

export class CreateMeetingDto {
  _id: mongoose.Schema.Types.ObjectId;
  
  @IsString()
  @Length(0, 200)
  @ApiProperty()
  readonly 'name': string;

  @IsDateString()
  @ApiProperty()
  readonly 'startDate': Date;

  @IsDateString()
  @ApiProperty()
  readonly 'endDate': Date;

  @ApiProperty()
  readonly 'owner': User;

  @ApiProperty()
  readonly 'room_id': mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  readonly 'participants': User[];
}
