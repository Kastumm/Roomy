import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsService } from './meetings.service';
import { Owner } from 'src/decorators/owner.decorator';
import { User } from 'src/users/schemas/user.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { Meeting } from './schemas/meeting.schema';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MeetingDTO } from './dto/meeting-dto';

@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingService: MeetingsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get()
  getAllMeetings(): Promise<MeetingDTO[]> {
    return this.meetingService.getAllMeetings();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get(':id')
  getMeetingById(@Param('id') id: string): Promise<Meeting> {
    return this.meetingService.getMeetingById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @Get('/user/:id')
  getMeetingsByUser(@Param('id') id:string):Promise<Meeting[]>{
    return this.meetingService.getAllMeetingsByUser(id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Post()
  createMeeting(@Owner() user: User, @Body() addMeetingDto: CreateMeetingDto): Promise<Meeting> {
    return this.meetingService.createMeeting(addMeetingDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  deleteMeeting(@Owner() user: User, @Param('id') id: string): Promise<Meeting> {
    return this.meetingService.removeMeeting(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Put(':id')
  updateMeeting(@Owner() user: User, @Body() updateRoomDto: UpdateMeetingDto, @Param('id') id: string): Promise<Meeting> {
    return this.meetingService.updateMeeting(updateRoomDto, id, user);
  }
}
