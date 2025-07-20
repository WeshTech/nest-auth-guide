import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import session from 'express-session';
import passport from 'passport';
import { ConfigService } from '@nestjs/config';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  app.use(cookieParser(configService.getOrThrow<string>('JWT_SECRET')));

  app.use(
    session({
      name: 'secure_token',
      secret: configService.getOrThrow<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: configService.get<string>('MONGO_URI'),
        ttl: Number(configService.get<string>('SESSION_EXPIRATION')),
        collectionName: 'sessions',
      }),
      cookie: {
        maxAge: Number(configService.get<string>('SESSION_EXPIRATION')),
        httpOnly: true,
        secure: configService.get<string>('NODE_ENV') === 'production',
        sameSite: 'strict',
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
