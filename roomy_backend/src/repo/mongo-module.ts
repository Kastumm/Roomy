import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingSchema } from 'src/meetings/schemas/meeting.schema';
import { RoomSchema } from 'src/rooms/schemas/room.schema';
import { UserSchema } from 'src/users/schemas/user.schema';
import { IDataServices } from './abstract-data-services';
import { Meeting, Room, User } from './models';
import { MongoDataServices } from './models/mongo-data-services';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomSchema },
      { name: Meeting.name, schema: MeetingSchema },
    ]),
    MongooseModule.forRoot(process.env.DATABASE_ROOT),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: MongoDataServices,
    },
  ],
  exports: [IDataServices],
})
export class MongoDataServicesModule {}
