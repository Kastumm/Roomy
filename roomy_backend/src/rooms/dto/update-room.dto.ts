import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class UpdateRoomDto {
  @ApiProperty()
  @IsString()
  readonly name?: string;

  @ApiProperty()
  @IsNumber()
  @Min(2)
  readonly capacity?: number;
}
