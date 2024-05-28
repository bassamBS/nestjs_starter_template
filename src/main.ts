import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HINDBAG } from './constant';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(HINDBAG);

  const config = new DocumentBuilder()
    .setTitle('Hindbag')
    .setDescription('Documentation swagger du projet Hindbag')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: false,
  });

  SwaggerModule.setup('hindbag/documentation', app, document);

  await app.listen(3000);
}
bootstrap();
