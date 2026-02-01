import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter'; // <--- Import

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global error filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Fix CORS: Allow specific Vercel frontend URL or '*' for all
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Vercel assigns a random port, so we must use process.env.PORT
  await app.listen(process.env.PORT || 3000);
}
void bootstrap();
