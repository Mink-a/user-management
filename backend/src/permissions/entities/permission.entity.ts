import { ApiProperty } from '@nestjs/swagger';
import { Permissions } from '@prisma/client';

export class PermissionEntity implements Permissions {
  @ApiProperty()
  permissionId: number;

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
