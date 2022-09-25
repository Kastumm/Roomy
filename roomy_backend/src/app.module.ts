import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { MeetingsModule } from './meetings/meetings.module';
import { AuthModule } from './auth/auth.module';
import { DataServicesModule } from './repo/data-service-module';
require('dotenv').config();

@Module({
  imports: [UsersModule, RoomsModule, MeetingsModule, DataServicesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
