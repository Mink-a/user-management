import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Code of the staff',
    example: '123456',
  })
  code: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Name of the staff',
    example: 'John Doe',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Email of the staff',
    example: 'john.doe@example.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Mobile number of the staff',
    example: '+911234567890',
  })
  mobile: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Joined date of the staff',
    example: new Date(),
  })
  joinedDate: Date;

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    description: 'Department ID of the staff',
    example: 1,
  })
  depId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Position of the staff',
    example: 'Manager',
  })
  position: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Age of the staff',
    example: 30,
  })
  age: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Gender of the staff',
    example: 'Male',
  })
  gender: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({
    description: 'Status of the staff',
    example: 'Active',
  })
  status: string;

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
}
