import { ApiProperty } from '@nestjs/swagger';
import { Departments } from '@prisma/client';

export class DepartmentEntity implements Departments {
  @ApiProperty()
  depId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  flag: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
