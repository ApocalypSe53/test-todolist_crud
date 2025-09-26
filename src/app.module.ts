import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { Todo, TodoSchema } from './todos/schemas/todo.schema';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: '.env', isGlobal: true}),
    MongooseModule.forRoot(process.env.MONGODB_URI || '', ),
    MongooseModule.forFeature([{ name: Todo.name, schema: TodoSchema }]),
    UsersModule,
    TodosModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
