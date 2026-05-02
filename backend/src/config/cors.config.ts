import { ConfigService } from '@nestjs/config';

export function getCorsConfig(configService: ConfigService) {
  return {
    origin: configService.get<string>('FRONTEND_URL', 'http://localhost:3000'),
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  };
}
