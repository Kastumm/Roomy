import { HttpException, HttpStatus, Injectable, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './schemas/meeting.schema';
import { RoomsService } from 'src/rooms/rooms.service';
import { IDataServices } from 'src/repo/abstract-data-services';
import { User } from 'src/repo/models';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingDTO } from './dto/meeting-dto';

@Injectable()
export class MeetingsService {
  constructor(private dataService: IDataServices, @Inject(forwardRef(() => RoomsService)) private roomsService: RoomsService) {}

  async getAllMeetings(): Promise<MeetingDTO[]> {
    const meetings = await this.dataService.meetings.getAll();
    const users = await this.dataService.users.getAll();
    const rooms = await this.dataService.rooms.getAll();

    const result = (meetings.map( meeting=>{

      const meetingDto= new MeetingDTO()
      meetingDto._id = String(meeting._id)
      meetingDto.title = meeting.name
      const owner =  users.forEach(user => {
        (String(meeting.owner) === String(user._id))? (meetingDto.owner = user.username) && (meetingDto.owner_id = user._id) : null
      });

      const room = rooms.find(room => String(room._id) === String(meeting.room_id));
      meetingDto.room_name = room.name

      meetingDto.duration= (Number(meeting.endDate.getTime()) - Number(meeting.startDate.getTime())) / 3600000 < 1 ? 1:2
      meetingDto.noParticipants= meeting.participants.length
      meetingDto.participants = meeting.participants
      const date = new Date (meeting.startDate)
      const monthNamesArray=["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]
      meetingDto.date = `${date.getDate()} ${monthNamesArray[date.getMonth()]} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
      meetingDto.date_iso = meeting.startDate
      meetingDto.startDate = meeting.startDate
      meetingDto.endDate = meeting.endDate
      meetingDto.room_id = meeting.room_id
      return meetingDto
    }));
    return result
  }

  async getAllMeetingsByUser(id:string):Promise<Meeting[]>{
    const meetings = await this.dataService.meetings.find({owner: id})
    return meetings
  }

  async getMeetingById(id: string): Promise<Meeting> {
    const meeting = await this.dataService.meetings.findById(id);
    return meeting;
  }

  async createMeeting(addMeetingDto: CreateMeetingDto, user: User): Promise<Meeting> {
    const timeValid = await this.timeLimitsCheck(addMeetingDto.startDate, addMeetingDto.endDate, 7200000);
    if (!timeValid) {
      throw new HttpException(`Time exceeded`, HttpStatus.NOT_ACCEPTABLE);
    }

    const roomExists = await this.roomsService.isRoomIdUnique(addMeetingDto.room_id);
    if (!roomExists) {
      throw new HttpException(`This Room Does Not Exist`, HttpStatus.NOT_ACCEPTABLE);
    }

    const meetingsToCheck = await this.dataService.meetings.find({ room_id: addMeetingDto.room_id });
    const meetingTimeAvailable = await this.isMeetingTimeAvailable(addMeetingDto, meetingsToCheck);
    if (!meetingTimeAvailable) {
      throw new HttpException(`Meeting Time False`, HttpStatus.NOT_ACCEPTABLE);
    }
    const room = await this.dataService.rooms.findById((addMeetingDto.room_id).toString())
    const roomUpdate = await this.dataService.rooms.update((addMeetingDto.room_id).toString(), {_id:room._id,name:room.name, capacity:room.capacity, appointments:room.appointments})
    const saveNewMeeting = await this.dataService.meetings.create({ ...addMeetingDto, owner: user });
    return saveNewMeeting;
  }

  async removeMeeting(id, user): Promise<Meeting> {
    const meeting = await this.getMeetingById(id);
    if (meeting.owner.toString() === user._id.toString()) {
      return this.dataService.meetings.findByIdAndRemove(id);
    }
    throw new UnauthorizedException('This meeting is not associated with your account');
  }

  async updateMeeting(updateMeetingDto: UpdateMeetingDto, id, user): Promise<Meeting> {
    const timeValid = await this.timeLimitsCheck(updateMeetingDto.startDate, updateMeetingDto.endDate, 7200000);
    if (!timeValid) {
      throw new HttpException(`Time exceeded`, HttpStatus.NOT_ACCEPTABLE);
    }

    const roomExists = await this.roomsService.isRoomIdUnique(updateMeetingDto.room_id);
    if (!roomExists) {
      throw new HttpException(`This Room Does Not Exist`, HttpStatus.NOT_ACCEPTABLE);
    }

    const meetingsToCheck = await this.dataService.meetings.find({ $and: [{ room_id: updateMeetingDto.room_id }, { _id: { $ne: id } }] });
    const meetingTimeAvailable = await this.isMeetingTimeAvailable(updateMeetingDto, meetingsToCheck);
    if (!meetingTimeAvailable) {
      throw new HttpException(`Meeting Time False`, HttpStatus.NOT_ACCEPTABLE);
    }

    const meeting = await this.dataService.meetings.findById(id);

    if (meeting.owner === user.email) {
      return this.dataService.meetings.findByIdAndUpdate(id, updateMeetingDto);
    }
    throw new UnauthorizedException('This meeting is not associated with your account');
  }

  //This will make sure, startTime of the meeting is happening in the future, and that it do not exceed 2 hours.
  async timeLimitsCheck(startTime, endTime, maxTimeAllowed): Promise<boolean> {
    const currentTime = new Date().getTime();
    const endsAt = new Date(endTime).getTime();
    const startsAt = new Date(startTime).getTime();
    const meetingDuration = endsAt - startsAt;

    if (meetingDuration <= maxTimeAllowed && meetingDuration >= 0 && startsAt > currentTime) {
      return true;
    }
    return false;
  }

  //This checks meetings times are not conflicting, probably should select only future meetings to be checked.
  async isMeetingTimeAvailable(dto, meetingsToCheck): Promise<boolean> {
    const checkPassArray = [];
    const endsAt = new Date(dto.endDate).getTime();
    const startsAt = new Date(dto.startDate).getTime();

    await meetingsToCheck.forEach(meeting => {
      if (endsAt < new Date(meeting.startDate).getTime() || startsAt > new Date(meeting.endDate).getTime()) {
        return checkPassArray.push('pass');
      }
      return checkPassArray.push('busy');
    });
    if (checkPassArray.includes('busy')) {
      return false;
    }
    return true;
  }

  async removeMeetingsByRoom(room_id): Promise<any> {
    const removeMeetings = await this.dataService.meetings.deleteMany({ room_id });
    return removeMeetings;
  }
}
