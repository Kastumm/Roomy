import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type RoomDocument = Room & Document;

@Schema()
export class Room {
  _id: mongoose.Schema.Types.ObjectId;
  
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  capacity: number;

  @Prop({default:0})
  appointments:number;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
