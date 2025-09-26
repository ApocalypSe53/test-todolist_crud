// src/users/users.controller.ts
import { Controller, Get, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    const currentUser = req.user;

    // Admin có quyền xoá tất cả
    if (currentUser.role === UserRole.ADMIN) {
      return this.usersService.remove(id);
    }

    // User chỉ được xoá chính mình
    if (currentUser.userId === id) {
      return this.usersService.remove(id);
    }

    return { message: 'Forbidden' };
  }
}
