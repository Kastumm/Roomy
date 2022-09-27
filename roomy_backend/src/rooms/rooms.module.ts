import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingsModule } from 'src/meetings/meetings.module';
import { DataServicesModule } from 'src/repo/data-service-module';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { Room, RoomSchema } from './schemas/room.schema';

@Module({
  providers: [RoomsService],
  controllers: [RoomsController],
  imports: [forwardRef(() => MeetingsModule), MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]), DataServicesModule],
  exports: [RoomsService],
})
export class RoomsModule {}
