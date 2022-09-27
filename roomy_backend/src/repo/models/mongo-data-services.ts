import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataServices } from '../abstract-data-services';
import { Meeting, Room, User } from '../models';
import { MeetingDocument } from 'src/meetings/schemas/meeting.schema';
import { UserDocument } from 'src/users/schemas/user.schema';
import { RoomDocument } from 'src/rooms/schemas/room.schema';
import { MongoGenericRepository } from '../mongo-generic-repository';

@Injectable()
export class MongoDataServices implements IDataServices, OnApplicationBootstrap {
  users: MongoGenericRepository<User>;
  rooms: MongoGenericRepository<Room>;
  meetings: MongoGenericRepository<Meeting>;

  constructor(
    @InjectModel(User.name)
    private UserRepository: Model<UserDocument>,
    @InjectModel(Room.name)
    private RoomRepository: Model<RoomDocument>,
    @InjectModel(Meeting.name)
    private MeetingRepository: Model<MeetingDocument>,
  ) {}

  onApplicationBootstrap() {
    this.users = new MongoGenericRepository<User>(this.UserRepository);
    this.rooms = new MongoGenericRepository<Room>(this.RoomRepository);
    this.meetings = new MongoGenericRepository<Meeting>(this.MeetingRepository);
  }
}
