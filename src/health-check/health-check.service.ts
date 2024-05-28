import { Injectable } from '@nestjs/common';
import { HealthCheckDto } from './dto/health-check.dto';

@Injectable()
export class HealthCheckService {
  getHealthCheck(): HealthCheckDto {
    return { message: 'En ligne! 🚀' };
  }
}
