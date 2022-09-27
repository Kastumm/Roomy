import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Room } from 'src/rooms/schemas/room.schema';
import { User } from 'src/users/schemas/user.schema';

export type MeetingDocument = Meeting & Document;

@Schema()
export class Meeting {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  startDate: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  endDate: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
  room_id: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  participants: User[];
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
