import { ConfigService } from '@nestjs/config';

export function getDatabaseConfig(configService: ConfigService) {
  return {
    uri: configService.get<string>('MONGO_URI'),
  };
}
