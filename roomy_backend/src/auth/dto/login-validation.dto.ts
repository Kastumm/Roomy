import { IsEmail } from 'class-validator';

export class LoginValidationDto {
  @IsEmail()
  readonly email: string;
  readonly password: string;
}
