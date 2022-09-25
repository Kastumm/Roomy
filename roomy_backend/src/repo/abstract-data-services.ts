import { IGenericRepository } from './generic-repository-abstract';
import { Meeting, Room, User } from './models';

export abstract class IDataServices {
  abstract users: IGenericRepository<User>;

  abstract rooms: IGenericRepository<Room>;

  abstract meetings: IGenericRepository<Meeting>;
}
