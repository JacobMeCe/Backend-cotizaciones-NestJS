import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import typeorm from "./config/typeorm.config";
import { CommonModule } from "./common/common.module";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { PrinterModule } from "./printer/printer.module";
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get("typeorm"),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "/public"),
    }),
    CommonModule,
    AuthModule,
    UsersModule,
    PrinterModule,
    CustomersModule,
  ],
})
export class AppModule {}
