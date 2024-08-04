import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.users.create({
      data: {
        ...createUserDto,
        role: {
          connect: [
            ...createUserDto.role?.map((role) => ({
              roleId: role,
            })),
          ],
        },
      },
    });
    return {
      data: user,
    };
  }

  async findAll() {
    const users = await this.prisma.users.findMany();
    const total = await this.prisma.users.count();
    return {
      data: users,
      meta: {
        _total: total,
      },
    };
  }

  async findByEmail(email: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        email: email,
      },
      include: {
        staff: true,
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });
    return {
      data: user,
    };
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: id,
      },
      include: {
        staff: true,
        role: {
          include: {
            permissions: true,
          },
        },
      },
      omit: {
        hashedPassword: true,
      },
    });
    return {
      data: user,
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.users.update({
      where: {
        userId: id,
      },
      data: {
        ...updateUserDto,
        role: {
          connect: [
            ...updateUserDto.role?.map((role) => ({
              roleId: role,
            })),
          ],
        },
      },
    });
    return {
      data: user,
    };
  }

  async remove(id: number) {
    const user = await this.prisma.users.delete({
      where: {
        userId: id,
      },
    });

    return {
      data: user,
    };
  }
}
