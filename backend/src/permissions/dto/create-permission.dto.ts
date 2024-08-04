import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Name of the permission',
    example: 'View',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Label of the permission',
    example: 'View',
  })
  label: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Flag of the permission',
    example: true,
  })
  flag: boolean;
}
