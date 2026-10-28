import { Module } from '@nestjs/common';
import { PowerService } from './power.service.js';

@Module({
  providers: [PowerService],
  exports: [PowerService],
})
export class PowerModule {}
