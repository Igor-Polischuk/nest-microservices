import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({})
export class PostgresConnectionModule {
  static forRoot(serviceName: string): DynamicModule {
    return {
      module: PostgresConnectionModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return {
              type: 'postgres',
              host: configService.get<string>(`${serviceName}_DB_HOST`),
              port: configService.get<number>(`${serviceName}_DB_PORT`),
              database: configService.get<string>(`${serviceName}_DB_DATABASE`),
              username: configService.get<string>(`${serviceName}_DB_USER`),
              password: configService.get<string>(`${serviceName}_DB_PASSWORD`),
              synchronize: false,
              autoLoadEntities: true,
            };
          },
        }),
      ],
    };
  }
}
