import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import {APP_PIPE} from '@nestjs/core';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { ReportsModule } from './reports/reports.module.js';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './users/user.entity.js'
import {Report} from './reports/report.entity.js';
import cookieSession from 'cookie-session';
import {ConfigModule, ConfigService} from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        // Se process.env.NODE_ENV existir, busca o arquivo correto (ex: .env.test)
        `.env.${process.env.NODE_ENV}`,
        // Caso o NODE_ENV venha vazio por alguma razão (ex: esquecer o cross-env),
        // ele usa o de desenvolvimento por padrão para o app não quebrar.
        '.env.development',
      ],
    }),
    // Alterado de forRoot() para forRootAsync() para carregar as variáveis de ambiente dinamicamente
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'better-sqlite3',
          database: configService.get<string>('DB_NAME') || 'db.sqlite',
          entities: [User, Report], // Suas entidades mapeadas explicitamente
          // LIGA a sincronização se for ambiente de teste (cria tabelas na hora)
          // DESLIGA se for desenvolvimento ou produção (exige rodar as migrations locais)
          synchronize: process.env.NODE_ENV === 'test',
        };
      },
    }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')!],
        }),
      )
      .forRoutes('*');
  }
}

