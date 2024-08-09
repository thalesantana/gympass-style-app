import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

import { UsersRepository } from '../users-repository';

export class PrismaUsersRepository implements UsersRepository{
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
  }
  async create(data: Prisma.UserCreateInput) {
    return await prisma.user.create({
      data,
    })
  }
}