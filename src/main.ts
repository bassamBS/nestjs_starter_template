import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { winstonLogger } from './logger.config';
import {
  DOCUMENTATION_DESCRIPTION,
  DOCUMENTATION_ENDPOINT,
  DOCUMENTATION_TITLE,
  DOCUMENTATION_VERSION,
  HINDBAG,
} from './constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  app.setGlobalPrefix(HINDBAG);

  const config = new DocumentBuilder()
    .setTitle(DOCUMENTATION_TITLE)
    .setDescription(DOCUMENTATION_DESCRIPTION)
    .setVersion(DOCUMENTATION_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup(DOCUMENTATION_ENDPOINT, app, document);

  await app.listen(3000);
}
bootstrap();
