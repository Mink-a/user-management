import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Staff ID of the user',
    example: 1,
  })
  staffId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email of the user',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Password of the user',
    example: 'password',
  })
  hashedPassword: string;

  @IsBoolean()
  @ApiProperty({
    description: 'Flag of the user',
    example: true,
    default: true,
  })
  flag: boolean;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Created by user ID',
    example: 1,
  })
  createdBy: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Updated by user ID',
    example: 1,
  })
  updatedBy: number;

  @IsArray()
  @ApiProperty({
    description: 'Roles of the user',
    example: [1, 2, 3],
  })
  role: number[];
}
