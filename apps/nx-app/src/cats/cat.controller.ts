import { Controller, Get } from '@nestjs/common';

import { CatService } from './cat.service';

@Controller()
export class CatController {
  constructor(private readonly appService: CatService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
