import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber()
  // Check the NGINX ubuntu@ultro.ovh configuration
  PORT: number;

  @IsString()
  MAILGUN_API_KEY: string;

  @IsString()
  MAILGUN_DOMAIN: string;

  @IsString()
  MAILGUN_USERNAME: string;

  @IsString()
  MAILGUN_TO: string;

  @IsString()
  MAILGUN_FROM: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
