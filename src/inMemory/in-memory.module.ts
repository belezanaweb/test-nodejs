import { Global, Module } from '@nestjs/common';
import { InMemoryService } from './in-memory.service';

@Global()
@Module({
  providers: [InMemoryService],
  exports: [InMemoryService],
})
export class InMemoryModule {}
