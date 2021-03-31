import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { loadModules } from './modules';
// read all modules folders and load all available modules
const modules: DynamicModule[] = loadModules();

@Module({
  imports: [ConfigModule, ConfigModule, ...modules],
})
export class AppModule {}
