import { Roles } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RoleEntity implements Roles {
  @ApiProperty()
  roleId: number;

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
