import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Name of the role',
    example: 'Super Admin',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Label of the role',
    example: 'Super Administrator',
  })
  label: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Flag of the role',
    example: true,
  })
  flag: boolean;

  @IsArray()
  @IsNotEmpty()
  @Transform(({ value }) => value.map((v) => Number(v)))
  @ApiProperty({
    description: 'Permissions of the role',
    example: [1, 2, 3],
  })
  permissions: number[];
}
