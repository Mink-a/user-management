import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FindAllQueryDto } from 'src/common/dtos/find-all-query.dto';

@Injectable()
export class DepartmentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = await this.prisma.departments.create({
      data: createDepartmentDto,
    });
    return {
      data: department,
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

    const departments = await this.prisma.departments.findMany({
      orderBy: {
        updatedAt: 'asc',
      },
      where: or,
      skip,
      take,
    });
    const total = await this.prisma.departments.count({ where: or });
    return {
      data: departments,
      meta: {
        _total: total,
      },
    };
  }

  async findOne(id: number) {
    const department = await this.prisma.departments.findUnique({
      where: {
        depId: id,
      },
    });

    return {
      data: department,
    };
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.prisma.departments.update({
      data: updateDepartmentDto,
      where: {
        depId: id,
      },
    });

    return {
      data: department,
    };
  }

  async remove(id: number) {
    const department = await this.prisma.departments.delete({
      where: {
        depId: id,
      },
    });
    return {
      data: department,
    };
  }
}
