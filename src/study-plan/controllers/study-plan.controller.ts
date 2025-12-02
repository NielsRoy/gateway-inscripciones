import { Controller, Get, Inject, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { NATS_SERVICE } from "../../config/injection-tokens";
import { AuthGuard } from "../../student/guards/auth.guard";

@ApiTags('Plan de Estudio')
@Controller('study-plan')
export class StudyPlanController {

  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy,
  ) { }

  @UseGuards(AuthGuard)
  @Get(':id')
  getStudyPlan(@Param('id', ParseIntPipe) id: number) {
    return this.natsClient.send('get_study_plan', { studyPlanId: id });
  }

}