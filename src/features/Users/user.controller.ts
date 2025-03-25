import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  //Post,
  Put,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
@Controller('users')
export class UsersController {
  constructor(private userService: UserService) {}
  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id);
  }
  /* @Post()
  async createUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data);
  } */

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() data: User): Promise<User> {
    return this.userService.updateUser(id, data);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
