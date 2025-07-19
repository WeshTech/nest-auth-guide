import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dtos/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const user = await this.usersService.registerUser(registerUserDto);
    return {
      message: 'User registered successfully',
      user,
    };
  }
}
