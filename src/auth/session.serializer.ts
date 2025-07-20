import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class sessionSerializer extends PassportSerializer {
  constructor(
    @Inject(UsersService) private readonly userService: UsersService,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    const {
      password,
      isVerified,
      createdAt,
      updatedAt,
      isActive,
      __v,
      ...sanitizedUser
    } = user.toObject?.() || user;
    done(null, sanitizedUser);
  }

  async deserializeUser(user: User, done: Function) {
    done(null, user);
  }
}
