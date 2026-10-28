import { Injectable } from '@nestjs/common';
import { PowerService} from '../power/power.service.js';

@Injectable()
export class CpuService {
  constructor(private powerService: PowerService) {}

  compute(a: number, b: number) {
    console.log('drawing 10 watts of power form power serive');
    this.powerService.supplyPower(10);
    return a + b;
  }
}
