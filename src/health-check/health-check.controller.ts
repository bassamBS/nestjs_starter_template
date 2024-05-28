import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheckDto } from './dto/health-check.dto';

@ApiTags('Health Check')
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('/')
  @ApiOperation({ description: 'Check Server Health' })
  @ApiOkResponse({
    description: 'Health Status Retrieval Successful',
    type: HealthCheckDto,
  })
  getHealthCheck() {
    return this.healthCheckService.getHealthCheck();
  }
}
