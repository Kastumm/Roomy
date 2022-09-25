import { HttpException, HttpStatus, Injectable, forwardRef, Inject } from '@nestjs/common';
import { MeetingsService } from 'src/meetings/meetings.service';
import { IDataServices } from 'src/repo/abstract-data-services';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomDTO } from './dto/room-dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './schemas/room.schema';
import mongoose from 'mongoose'
@Injectable()
export class RoomsService {
  constructor(private dataService: IDataServices, @Inject(forwardRef(() => MeetingsService)) private meetingsService: MeetingsService) {}

  async getAll(): Promise<RoomDTO[]> {
    const currentTime = new Date();
    const currentMeetings = await this.dataService.meetings.find({$and: [{startDate: {$lt:currentTime}},{endDate:{$gt:currentTime}}]})
    const futureMeetings = await this.dataService.meetings.find({startDate: {$gt:currentTime}});
    const rooms = await this.dataService.rooms.getAll()
    const result = rooms.map(room => {
      const futureMeetingsLength = futureMeetings.filter(meeting => String(meeting.room_id) === String(room._id)).length;
      const currentStatus = currentMeetings.filter(meeting=>String(meeting.room_id)=== String(room._id)).length
      const roomDto = new RoomDTO();
      roomDto._id = String(room._id);
      roomDto.capacity = room.capacity;
      roomDto.name = room.name;
      roomDto.futureAppointments = futureMeetingsLength;
      roomDto.currentStatus = currentStatus? "Occupied": "Free"
      return roomDto;
    })
    return result;
  }

  async getRoomById(id: string): Promise<Room> {
    const room = await this.dataService.rooms.findById(id);
    return room;
  }

  async createRoom(roomDto: CreateRoomDto): Promise<Room> {
    const roomNameExists = await this.isRoomNameUnique(roomDto.name);
    if (roomNameExists) {
      throw new HttpException(`A room named : ${roomDto.name} already exists`, HttpStatus.CONFLICT);
    }
    const saveNewRoom = this.dataService.rooms.create(roomDto);
    return saveNewRoom;
  }

  async removeRoom(id: string): Promise<Room> {
    const removingMeetings = await this.meetingsService.removeMeetingsByRoom(id);
    return this.dataService.rooms.findByIdAndRemove(id);
  }

  async updateRoom(id: string, roomDto: UpdateRoomDto): Promise<Room> {
    // const roomNameExists = await this.isRoomNameUnique(roomDto.name);
    // if (roomNameExists) {
    //   throw new HttpException(`A room named : ${roomDto.name} already exists`, HttpStatus.CONFLICT);
    // }
    return this.dataService.rooms.findByIdAndUpdate(id, roomDto);
  }

  async isRoomNameUnique(name: string): Promise<boolean> {
    const roomExists = await this.dataService.rooms.exists({ name });
    if (roomExists) {
      return true;
    }
    return false;
  }

  async isRoomIdUnique(id: mongoose.Schema.Types.ObjectId): Promise<boolean> {
    const roomExists = await this.dataService.rooms.exists({ _id: id });
    if (roomExists) {
      return true;
    }
  }
}
