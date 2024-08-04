import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Name of the department',
    example: 'HR',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Label of the department',
    example: 'Human Resources',
  })
  label: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ default: true })
  @ApiProperty({
    description: 'Flag of the department',
    example: true,
    default: true,
  })
  flag: boolean;
}
