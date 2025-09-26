// src/todos/todos.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { QueryTodoDto } from './dto/query-todo.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() dto: CreateTodoDto, @Request() req: any) {
    return this.todosService.create(dto, req.user.userId);
  }

  @Get()
  findAll(@Query() query: QueryTodoDto, @Request() req: any) {
    return this.todosService.findAll(query, req.user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.todosService.findOne(id, req.user.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTodoDto, @Request() req: any) {
    return this.todosService.update(id, dto, req.user.userId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateStatusDto, @Request() req: any) {
    return this.todosService.updateStatus(id, dto, req.user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
    return this.todosService.remove(id, req.user.userId);
  }
}
