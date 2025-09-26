// src/todos/dto/create-todo.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsEnum } from 'class-validator';
import { TodoStatus } from 'src/common/enums/todo-status.enum';
export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus;
}
