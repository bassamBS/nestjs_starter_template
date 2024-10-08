import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { HealthCheckModule } from './health-check/health-check.module';
import { RequestLoggerMiddleware } from './common/middleware/request-logger.middleware';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    ConfigModule.forRoot({ validate, isGlobal: true, cache: true }),
    HealthCheckModule,
  ],
  providers: [EmailService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
