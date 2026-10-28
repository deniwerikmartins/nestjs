import { Injectable } from '@nestjs/common';
import { PowerService} from '../power/power.service.js';

@Injectable()
export class DiskService {
  constructor(private powerService: PowerService) {}

  getData() {
    console.log("drawing 20 watts of power from powerServvice");
    this.powerService.supplyPower(20);
    return 'data!';
  }
}
