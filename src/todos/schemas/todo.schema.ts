// src/todos/schemas/todo.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TodoStatus } from '../../common/enums/todo-status.enum';
import * as mongoose from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: TodoStatus.PENDING, enum: Object.values(TodoStatus) })
  status: TodoStatus;

   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
