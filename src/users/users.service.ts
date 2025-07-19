import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from './dtos/register.dto';
import { Model, Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const existingUser = await this.userModel.findOne({
      email: registerUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email in use or Account Blocked');
    }

    const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

    const createdUser = await this.userModel.create({
      email: registerUserDto.email,
      password: hashedPassword,
      business: registerUserDto.business,
    });

    const { password, ...result } = createdUser.toJSON();
    return result;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email });
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.userModel.findById(id);
  }

  async updateUserLoginStatus(
    sessionId: Schema.Types.ObjectId,
    userId: string,
  ) {
    await this.userModel.findByIdAndUpdate(userId, {
      $set: { activeSessionId: sessionId },
    });
  }
}
