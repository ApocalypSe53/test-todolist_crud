// src/todos/todos.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { QueryTodoDto } from './dto/query-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(dto: CreateTodoDto): Promise<Todo> {
    const created = new this.todoModel(dto);
    return created.save();
  }

  async findAll(query: QueryTodoDto) {
    const { limit, offset, search, status } = query;

    const filter: any = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }
    if (status) {
      filter.status = status;
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

  async findOne(id: string): Promise<Todo> {
    const todo = await this.todoModel.findById(id).exec();
    if (!todo) throw new NotFoundException(`Todo with id ${id} not found`);
    return todo;
  }

  async update(id: string, dto: UpdateTodoDto): Promise<Todo> {
    const updated = await this.todoModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException(`Todo with id ${id} not found`);
    return updated;
  }

  async updateStatus(id: string, dto: UpdateStatusDto): Promise<Todo> {
    const updated = await this.todoModel.findByIdAndUpdate(
      id,
      { status: dto.status },
      { new: true },
    );
    if (!updated) throw new NotFoundException(`Todo with id ${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.todoModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Todo with id ${id} not found`);
  }
}
