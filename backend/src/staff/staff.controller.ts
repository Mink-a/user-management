import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { StaffEntity } from './entities/staff.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/auth/decorator/user.decorator';
import { JwtUserDto } from 'src/auth/dto/jwt-user.dto';
import { FindAllQueryDto } from './dto/find-all-query.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('staff')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('staff')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  @ApiCreatedResponse({ type: StaffEntity })
  async create(@Body() createStaffDto: CreateStaffDto) {
    const { data: staff } = await this.staffService.create(createStaffDto);
    await this.userService.create({
      name: createStaffDto.name,
      email: createStaffDto.email,
      hashedPassword: 'password',
      flag: true,
      staffId: staff.staffId,
      createdBy: 1,
      updatedBy: 1,
      role: [3],
    });
    return staff;
  }

  @Get()
  @ApiOkResponse({ type: StaffEntity, isArray: true })
  findAll(@Query() queryParams: FindAllQueryDto, @User() user: JwtUserDto) {
    return this.staffService.findAll(queryParams, user);
  }

  @Get('profile')
  @ApiOkResponse({ type: StaffEntity })
  profile(@User() user: JwtUserDto) {
    const staffId = user.loginId; // TODO: get from user
    return this.staffService.profile(staffId);
  }

  @Get(':id')
  @ApiOkResponse({ type: StaffEntity })
  findOne(@Param('id', ParseIntPipe) id: number, @User() user: JwtUserDto) {
    return this.staffService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOkResponse({ type: StaffEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    const { data: staff } = await this.staffService.update(+id, updateStaffDto);
    await this.userService.update(staff.staffId, {
      name: updateStaffDto.name,
      email: updateStaffDto.email,
      flag: true,
      role: staff.users.role.map((role) => role.roleId),
    });
    return staff;
  }

  @Delete(':id')
  @ApiOkResponse({ type: StaffEntity })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.staffService.remove(id);
  }
}
