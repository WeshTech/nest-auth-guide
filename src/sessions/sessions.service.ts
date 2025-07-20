import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class SessionsService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async getActiveSessions(userEmail: string) {
    const sessions = await this.connection
      .collection('sessions')
      .countDocuments({
        session: { $regex: `"email":"${userEmail}"` },
      });

    return sessions;
  }
}
