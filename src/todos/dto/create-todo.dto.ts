// src/todos/dto/create-todo.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  status?: string;
}
