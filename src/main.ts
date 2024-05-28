import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { winstonLogger } from './logger.config';
import { ConfigService } from '@nestjs/config';
import { InternalServerErrorFilter } from './common/filters/http-exception/http-exception.filter';
import {
  DOCUMENTATION_DESCRIPTION,
  DOCUMENTATION_ENDPOINT,
  DOCUMENTATION_TITLE,
  DOCUMENTATION_VERSION,
  HINDBAG,
  PORT,
} from './constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });

  app.setGlobalPrefix(HINDBAG);

  app.useGlobalFilters(new InternalServerErrorFilter());

  const config = new DocumentBuilder()
    .setTitle(DOCUMENTATION_TITLE)
    .setDescription(DOCUMENTATION_DESCRIPTION)
    .setVersion(DOCUMENTATION_VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup(DOCUMENTATION_ENDPOINT, app, document);

  const configService = app.get(ConfigService);
  const port = configService.get(PORT);
  await app.listen(port);
}
bootstrap();
