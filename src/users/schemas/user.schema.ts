// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from '../../common/enums/user-role.enum';
import { Todo } from '../../todos/schemas/todo.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: UserRole.USER, enum: Object.values(UserRole) })
  role: UserRole;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Todo' }] })
  todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
