import { ConfigService } from '@nestjs/config';

export function getAppConfig(configService: ConfigService) {
  return {
    port: Number(configService.get('PORT', 3001)),
  };
}
