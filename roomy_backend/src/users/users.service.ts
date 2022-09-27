import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { IDataServices } from 'src/repo/abstract-data-services';
import { UserDTO } from './dto/user-dto';

@Injectable()
export class UsersService {
  constructor(private dataService: IDataServices) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    const emailExists = await this.isEmailUnique(userDto.email);
    if (emailExists) {
      throw new HttpException(`A user with ${userDto.email} is already registered `, HttpStatus.CONFLICT);
    }
    const saltOrRounds = 10;
    const password = await bcrypt.hash(userDto.password, saltOrRounds);
    const saveNewUser = await this.dataService.users.create({ ...userDto, password: password });
    return saveNewUser;
  }

  async getAll(): Promise<User[]> {
    return this.dataService.users.getAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.dataService.users.findById(id);
    return user;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.dataService.users.findOne({ email });
    return user;
  }

  async finndOneByEmail(email:string):Promise<UserDTO>{
    const user = await this.dataService.users.findOne({ email });
    const userDto = new UserDTO();
    userDto._id=String(user._id);
    userDto.email=user.email;
    userDto.username=user.email;
    return userDto;
  }

  async isEmailUnique(email: string): Promise<boolean> {
    const emailExists = await this.dataService.users.exists({ email });
    if (emailExists) {
      return true;
    }
    return false;
  }
}
