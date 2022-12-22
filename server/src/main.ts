import { NestFactory } from '@nestjs/core';
import passport from 'passport';
import { AppModule } from './app.module';
// import expressSession from 'express-session';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { NestExpressApplication } from '@nestjs/platform-express';
const production = process.env.NODE_ENV === 'production';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    cors({
      credentials: true,
      origin: true,
    }),
  );
  app.set('trust proxy', true);
  app.use((req, res, next) => {
    const proxySecure = req.headers['x-forwarded-proto'] === 'https';
    return cookieSession({
      keys: ['this is a very secret key for the partivity website'],
      maxAge: 60 * 60 * 24 * 1000 * 2,
      sameSite: production ? 'none' : 'strict',
      httpOnly: true,
      secure: proxySecure,
      // secureProxy: proxySecure,
    })(req, res, next);
  });

  app.use(passport.initialize());
  app.use(passport.session());

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, () => {
    console.log(`app on http://localhost:${PORT}`);
  });
}
bootstrap();
