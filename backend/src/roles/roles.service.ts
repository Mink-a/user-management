import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FindAllQueryDto } from 'src/common/dtos/find-all-query.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    // when creating a role, contain as least view permission
    const role = await this.prisma.roles.create({
      data: {
        ...createRoleDto,
        permissions: {
          connect: [
            // want to overwrite the existing permissions
            ...createRoleDto.permissions.map((permission) => ({
              permissionId: permission,
            })),
          ],
        },
      },
    });

    return {
      data: role,
    };
  }

  async findAll(queryParams: FindAllQueryDto) {
    const { _page = 0, _per_page = 10, _search } = queryParams;
    const skip = +_page * _per_page;
    const take = +_per_page;
    const or = _search
      ? {
          OR: [
            { name: { contains: _search } },
            { label: { contains: _search } },
          ],
        }
      : {};
    const roles = await this.prisma.roles.findMany({
      where: or,
      skip,
      take,
      include: {
        permissions: true,
      },
    });
    const total = await this.prisma.roles.count({
      where: or,
    });
    return {
      data: roles,
      meta: {
        _total: total,
      },
    };
  }

  async findOne(id: number) {
    const role = await this.prisma.roles.findUnique({
      where: {
        roleId: id,
      },
      include: {
        permissions: true,
      },
    });

    return {
      data: role,
    };
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.prisma.roles.update({
      where: {
        roleId: id,
      },
      data: {
        ...updateRoleDto,
        permissions: {
          set: [
            // want to overwrite the existing permissions
            ...updateRoleDto.permissions.map((permission) => ({
              permissionId: permission,
            })),
          ],
        },
      },
    });

    return {
      data: role,
    };
  }

  async remove(id: number) {
    const role = await this.prisma.roles.delete({
      where: {
        roleId: id,
      },
    });

    return {
      data: role,
    };
  }
}
