import {
  ExceptionFilter,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

export class InternalServerErrorFilter implements ExceptionFilter {
  private readonly emailService = new EmailService();
  private readonly logger = new Logger(InternalServerErrorFilter.name);

  async catch(exception: InternalServerErrorException) {
    await this.emailService.sendInternalError(String(exception));

    this.logger.error(exception);
  }
}
