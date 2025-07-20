import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { RegisterUserDto } from 'src/users/dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(signUp: RegisterUserDto) {
    const user = await this.userService.registerUser(signUp);
    return user;
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userService.findUserByEmail(email);
    if (!user)
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`,
      );
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }

    return user;
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findUserByEmail(payload.sub);
    if (!user) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.sub}`,
      );
    }
    return user;
  }

  signToken(user: User): string {
    const payload = {
      sub: user.email,
    };

    return this.jwtService.sign(payload);
  }
}
