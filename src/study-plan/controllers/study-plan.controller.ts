import { Controller, Get, Inject, Param, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags } from "@nestjs/swagger";
import { PROCESSOR_SERVICE } from "src/config/services";
import { AuthGuard } from "../../student/guards/auth.guard";

@ApiTags('Plan de Estudio')
@Controller('study-plan')
export class StudyPlanController {

  constructor(
    @Inject(PROCESSOR_SERVICE) private readonly processorClient: ClientProxy,
  ) { }

  @UseGuards(AuthGuard)
  @Get(':id')
  getStudyPlan(@Param('id', ParseIntPipe) id: number) {
    return this.processorClient.send('get_study_plan', { studyPlanId: id });
  }

}