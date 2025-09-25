// src/todos/dto/update-status.dto.ts
import { IsString, IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsString()
  @IsIn(['pending', 'in-progress', 'done'])
  status: string;
}
