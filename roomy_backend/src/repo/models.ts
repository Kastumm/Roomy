import mongoose from 'mongoose';

export class User {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export class Room {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  capacity: number;
  appointments:number;
}

export class Meeting {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  startDate: Date;
  endDate: Date;
  owner: User;
  room_id: mongoose.Schema.Types.ObjectId;
  participants: User[];
}
