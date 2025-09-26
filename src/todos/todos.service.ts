// src/todos/todos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { QueryTodoDto } from './dto/query-todo.dto';
import { TodoStatus } from '../common/enums/todo-status.enum';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(dto: CreateTodoDto, userId: string): Promise<Todo> {
  const created = new this.todoModel({
    ...dto,
    user: userId,
  });
  return created.save();
}

  async findAll(query: QueryTodoDto, userId: string) {
  const { limit, offset, search, status } = query;

  const filter: any = { user: userId };

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } },
    ];
  }
  if (status) {
    filter.status = status as TodoStatus;
  }

  const [items, total] = await Promise.all([
    this.todoModel.find(filter).skip(offset).limit(limit).exec(),
    this.todoModel.countDocuments(filter).exec(),
  ]);

  return {
    statusCode: 200,
    data: {
      items,
      meta: {
        limit,
        offset,
        total,
        totalPages: limit > 0 ? Math.ceil(total / limit) : null,
      },
    },
  };
}

  async findOne(id: string, userId: string): Promise<Todo> {
  const todo = await this.todoModel.findOne({ _id: id, user: userId }).exec();
  if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
  return todo;
}

async update(id: string, dto: UpdateTodoDto, userId: string): Promise<Todo> {
  const updated = await this.todoModel.findOneAndUpdate(
    { _id: id, user: userId },
    dto,
    { new: true },
  );
  if (!updated) throw new NotFoundException(`Todo with id ${id} not found`);
  return updated;
}

async updateStatus(id: string, dto: UpdateStatusDto, userId: string): Promise<Todo> {
  const updated = await this.todoModel.findOneAndUpdate(
    { _id: id, user: userId },
    { status: dto.status },
    { new: true },
  );
  if (!updated) throw new NotFoundException(`Todo with id ${id} not found`);
  return updated;
}

async remove(id: string, userId: string): Promise<void> {
  const deleted = await this.todoModel.findOneAndDelete({ _id: id, user: userId });
  if (!deleted) throw new NotFoundException(`Todo with id ${id} not found`);
}
}
