import { Injectable, Logger } from '@nestjs/common';
import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { readFileSync } from 'node:fs';
import * as ejs from 'ejs';
import {
  SUBJECT_INTERNAL_SERVER_ERROR,
  TEMPLATE_INTERNAL_SERVER_ERROR,
} from 'src/constant';

@Injectable()
export class EmailService {
  private readonly logger = new Logger();

  private mailgun = new Mailgun(FormData).client({
    username: process.env.MAILGUN_USERNAME,
    key: process.env.MAILGUN_API_KEY,
  });

  public async sendInternalError(exception: string) {
    const template = this.buildTemplate(TEMPLATE_INTERNAL_SERVER_ERROR, {
      exception,
    });

    const res = await this.mailgun.messages.create(process.env.MAILGUN_DOMAIN, {
      from: process.env.MAILGUN_FROM,
      to: process.env.MAILGUN_TO,
      subject: SUBJECT_INTERNAL_SERVER_ERROR,
      html: template,
    });

    const message = `Email sent - ${SUBJECT_INTERNAL_SERVER_ERROR} - ${JSON.stringify(res)}`;
    this.logger.log(message);
  }

  private getEJSTemplate(templateName: string) {
    const templatePath = `./email-templates/${templateName}`;
    const template = readFileSync(templatePath, 'utf-8');
    return ejs.compile(template);
  }

  private buildTemplate(name: string, variables) {
    const template = this.getEJSTemplate(name);
    return template(variables);
  }
}
