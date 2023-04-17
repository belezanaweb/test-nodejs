import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProuctsModule } from "./products/products.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: ".sqlite/test-nodejs",
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    ProuctsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
