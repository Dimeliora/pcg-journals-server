import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

export const getJwtConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.get<string>('JWT_SECRET_KEY'),
  signOptions: getJwtOptions(),
});

const getJwtOptions = (): JwtSignOptions => ({
  expiresIn: '24h',
});
