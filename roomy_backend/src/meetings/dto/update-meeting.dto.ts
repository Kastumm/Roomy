import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsString, Length } from 'class-validator';
import { Date } from 'mongoose';
import { Room, User } from 'src/repo/models';
import mongoose from 'mongoose'

export class UpdateMeetingDto {
  @IsString()
  @Length(0, 200)
  @ApiProperty()
  readonly 'name': string;

  @ApiProperty()
  @IsDateString()
  readonly 'startDate': Date;

  @ApiProperty()
  @IsDateString()
  readonly 'endDate': Date;

  @ApiProperty()
  readonly 'room_id': mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  readonly 'participants': User[];
}
