// src/todos/dto/update-status.dto.ts
import { IsString, IsIn, IsEnum } from 'class-validator';
import { TodoStatus } from 'src/common/enums/todo-status.enum';

export class UpdateStatusDto {
   @IsEnum(TodoStatus)
  status: TodoStatus;
}
