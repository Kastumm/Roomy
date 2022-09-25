import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DataServicesModule } from 'src/repo/data-service-module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { MeetingsController } from './meetings.controller';
import { MeetingsService } from './meetings.service';
import { Meeting, MeetingSchema } from './schemas/meeting.schema';

@Module({
  controllers: [MeetingsController],
  providers: [MeetingsService],
  imports: [forwardRef(() => RoomsModule), MongooseModule.forFeature([{ name: Meeting.name, schema: MeetingSchema }]), DataServicesModule],
  exports: [MeetingsService],
})
export class MeetingsModule {}
