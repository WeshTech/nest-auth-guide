import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import envConfig from './config/envConfig';
import { envConfigSchema } from './config/envConfig.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { SessionsService } from './sessions/sessions.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      validationSchema: envConfigSchema,
      validationOptions: {
        abortEarly: true,
      },
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    PassportModule.register({
      session: true,
    }),

    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, SessionsService],
})
export class AppModule {}
