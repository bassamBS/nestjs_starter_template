import { MiddlewareConsumer, Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';

@Module({
  imports: [HealthCheckModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
