import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { GlobalErrorHandler } from './shared/handlers/global-exception.handler';
import { ResponseHandler } from './shared/handlers/response.handler';
// import { fastifyHelmet } from '@fastify/helmet';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      rawBody: true,
    },
  );

  const config = new DocumentBuilder()
    .setTitle('Sandlot Api')
    .setDescription('Sandlot api documentation')
    .setVersion('2.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();

  app.useGlobalFilters(new GlobalErrorHandler());
  const responseHandler = app.get(ResponseHandler);

  app.useGlobalInterceptors(responseHandler);

  // await app.register(fastifyHelmet);
  // await app.init();

  await app.listen(3000, '0.0.0.0');
  const appUrl = await app.getUrl();
  console.log(`url ==> ${appUrl}`);
}

bootstrap();
