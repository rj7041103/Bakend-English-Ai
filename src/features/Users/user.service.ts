import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma-client/prisma.service';
import { User } from '@prisma/client';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  getUser(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  deleteUser(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  updateUser(id: string, data: any): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async createUser(data: User): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está en uso');
    }

    return this.prisma.user.create({ data });
  }
}
