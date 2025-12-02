import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {

  @Get('check')
  checkAppStatus() {
    return { status: `Gateway API REST running` };
  }
}