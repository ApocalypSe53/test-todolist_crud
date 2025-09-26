// src/users/dto/create-user.dto.ts
import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(UserRole)
  role?: UserRole = UserRole.USER;
}
