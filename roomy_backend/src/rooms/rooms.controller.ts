import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Admin } from 'src/decorators/roles.decorator';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsService } from './rooms.service';
import { Room } from './schemas/room.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { RoomDTO } from './dto/room-dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @ApiQuery({})
  @Get()
  getAllRooms(): Promise<RoomDTO[]> {
    return this.roomsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get(':id')
  getRoomById(@Param('id') id: string): Promise<Room> {
    return this.roomsService.getRoomById(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @Admin(true)
  @Post()
  addRoom(@Body() addRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomsService.createRoom(addRoomDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @Admin(true)
  @Delete(':id')
  deleteRoom(@Param('id') id: string): Promise<Room> {
    return this.roomsService.removeRoom(id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiBearerAuth('access-token')
  @Admin(true)
  @Put(':id')
  updateRoom(@Body() updateRoomDto: UpdateRoomDto, @Param('id') id: string): Promise<Room> {
    return this.roomsService.updateRoom(id, updateRoomDto);
  }
}
