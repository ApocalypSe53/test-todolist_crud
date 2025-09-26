// src/todos/dto/update-todo.dto.ts
import { IsString, IsOptional, IsEnum } from 'class-validator';
import { TodoStatus } from 'src/common/enums/todo-status.enum';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(TodoStatus)
    status?: TodoStatus;
}
