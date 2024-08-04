import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FindAllQueryDto } from 'src/common/dtos/find-all-query.dto';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPermissionDto: CreatePermissionDto) {
    const permission = await this.prisma.permissions.create({
      data: createPermissionDto,
    });
    return {
      data: permission,
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
    const permissions = await this.prisma.permissions.findMany({
      where: or,
      skip,
      take,
    });
    const total = await this.prisma.permissions.count({
      where: or,
    });
    return {
      data: permissions,
      meta: {
        _total: total,
      },
    };
  }

  async findOne(id: number) {
    const permission = await this.prisma.permissions.findUnique({
      where: {
        permissionId: id,
      },
      include: {
        roles: true,
      },
    });

    return {
      data: permission,
    };
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.prisma.permissions.update({
      where: {
        permissionId: id,
      },
      data: updatePermissionDto,
    });

    return {
      data: permission,
    };
  }

  async remove(id: number) {
    const permission = await this.prisma.permissions.delete({
      where: {
        permissionId: id,
      },
    });

    return {
      data: permission,
    };
  }
}
