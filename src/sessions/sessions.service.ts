import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ObjectId, Schema } from 'mongoose';

@Injectable()
export class SessionsService {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  private getSessionStore() {
    return this.connection.collection('sessions');
  }

  async findSessionById(sessionId: Schema.Types.ObjectId) {
    return await this.getSessionStore().findOne({
      _id: sessionId as unknown as Schema.Types.ObjectId,
    });
  }
}
