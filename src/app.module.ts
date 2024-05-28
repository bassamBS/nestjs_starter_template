import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { HealthCheckModule } from './health-check/health-check.module';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true, cache: true }),
    HealthCheckModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
