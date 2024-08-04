import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtUserDto } from './dto/jwt-user.dto';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const { data: user } = await this.usersService.findByEmail(email);

    if (user && user.hashedPassword === pass) {
      return user;
    }

    return null;
  }

  async login(user: JwtUserDto) {
    const payload = {
      email: user.email,
      sub: user.loginId,
      role: user.role,
      departmentId: user.departmentId,
    };
    const { data: responseUser } = await this.usersService.findOne(
      user.loginId,
    );
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '30d' }),
      user: responseUser,
    };
  }

  async refresh(user: JwtUserDto, refreshToken: RefreshDto) {
    console.log(refreshToken, user);
    const { data: foundUser } = await this.usersService.findByEmail(user.email);
    if (foundUser) {
      const payload = {
        email: foundUser.email,
        sub: foundUser.staffId,
        role: foundUser.role,
        departmentId: foundUser.staff.depId,
      };
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
        refresh_token: this.jwtService.sign(payload, { expiresIn: '30d' }),
        user: foundUser,
      };
    }
  }
}
