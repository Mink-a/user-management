import { Injectable } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { JwtUserDto } from 'src/auth/dto/jwt-user.dto';

@Injectable()
export class StaffService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStaffDto: CreateStaffDto) {
    const staff = await this.prisma.staff.create({
      data: createStaffDto,
    });
    return {
      data: staff,
    };
  }

  async findAll(queryParams: FindAllQueryDto, user: JwtUserDto) {
    const { _page = 0, _per_page = 10, _search } = queryParams;
    const skip = +_page * _per_page;
    const take = +_per_page;
    const { role, loginId, departmentId } = user;
    const or = _search
      ? {
          OR: [
            { name: { contains: _search } },
            { email: { contains: _search } },
            { mobile: { contains: _search } },
          ],
        }
      : {};

    let staff;
    let total;

    if (role === 'Super Admin') {
      staff = await this.prisma.staff.findMany({
        skip,
        take,
        where: or,
        include: {
          department: true,
          users: {
            include: {
              role: {
                include: {
                  permissions: true,
                },
              },
            },
            omit: {
              hashedPassword: true,
            },
          },
        },
      });
      total = await this.prisma.staff.count({
        where: or,
      });
    } else if (role === 'Manager') {
      staff = await this.prisma.staff.findMany({
        skip,
        take,
        where: {
          AND: [
            or,
            {
              OR: [{ staffId: loginId }, { depId: departmentId }],
            },
          ],
        },
        include: {
          department: true,
          users: {
            include: {
              role: {
                include: {
                  permissions: true,
                },
              },
            },
            omit: {
              hashedPassword: true,
            },
          },
        },
      });
      total = await this.prisma.staff.count({
        where: {
          AND: [
            or,
            {
              OR: [{ staffId: loginId }, { depId: departmentId }],
            },
          ],
        },
      });
    } else if (role === 'User') {
      staff = await this.prisma.staff.findMany({
        skip,
        take,
        where: {
          AND: [or, { staffId: loginId }],
        },
        include: {
          department: true,
          users: {
            include: {
              role: {
                include: {
                  permissions: true,
                },
              },
            },
            omit: {
              hashedPassword: true,
            },
          },
        },
      });
      total = await this.prisma.staff.count({
        where: {
          AND: [or, { staffId: loginId }],
        },
      });
    } else {
      staff = [];
      total = 0;
    }

    return {
      data: staff,
      meta: {
        _total: total,
      },
    };
  }

  async findOne(id: number, user) {
    const { role, departmentId, loginId } = user;

    let staff;

    if (role === 'Super Admin') {
      staff = await this.prisma.staff.findUnique({
        where: {
          staffId: id,
        },
        include: {
          department: true,
          users: {
            include: {
              role: {
                include: {
                  permissions: true,
                },
              },
            },
            omit: {
              hashedPassword: true,
            },
          },
        },
      });
    } else if (role === 'Manager') {
      staff = await this.prisma.staff.findUnique({
        where: {
          staffId: id,
          AND: {
            depId: departmentId,
          },
        },
        include: {
          department: true,
          users: {
            include: {
              role: {
                include: {
                  permissions: true,
                },
              },
            },
            omit: {
              hashedPassword: true,
            },
          },
        },
      });
    } else if (role === 'User') {
      staff = await this.prisma.staff.findUnique({
        where: {
          staffId: id,
          AND: {
            staffId: loginId,
          },
        },
        include: {
          department: true,
          users: {
            include: {
              role: {
                include: {
                  permissions: true,
                },
              },
            },
            omit: {
              hashedPassword: true,
            },
          },
        },
      });
    } else {
      staff = {};
    }

    return {
      data: staff,
    };
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    const staff = await this.prisma.staff.update({
      data: updateStaffDto,
      where: {
        staffId: id,
      },
      include: {
        department: true,
        users: {
          include: {
            role: {
              include: {
                permissions: true,
              },
            },
          },
          omit: {
            hashedPassword: true,
          },
        },
      },
    });
    return {
      data: staff,
    };
  }

  async remove(id: number) {
    const staff = await this.prisma.staff.delete({
      where: {
        staffId: id,
      },
    });

    return {
      data: staff,
    };
  }

  async profile(staffId: number) {
    const staff = await this.prisma.staff.findUnique({
      where: {
        staffId: staffId,
      },
      include: {
        department: true,
        users: {
          include: {
            role: {
              include: {
                permissions: true,
              },
            },
          },
          omit: {
            hashedPassword: true,
          },
        },
      },
    });

    return {
      data: staff,
    };
  }
}
