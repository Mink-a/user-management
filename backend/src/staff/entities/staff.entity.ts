import { ApiProperty } from '@nestjs/swagger';
import { Staff } from '@prisma/client';

export class StaffEntity implements Staff {
  @ApiProperty()
  staffId: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  joinedDate: Date;

  @ApiProperty()
  depId: number;

  @ApiProperty()
  position: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  createdBy: number;

  @ApiProperty()
  updatedBy: number;
}
