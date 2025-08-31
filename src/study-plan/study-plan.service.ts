import { Injectable } from '@nestjs/common';
import { CreateStudyPlanDto } from './dto/create-study-plan.dto';
import { UpdateStudyPlanDto } from './dto/update-study-plan.dto';

@Injectable()
export class StudyPlanService {
  create(createStudyPlanDto: CreateStudyPlanDto) {
    return 'This action adds a new studyPlan';
  }

  findAll() {
    return `This action returns all studyPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} studyPlan`;
  }

  update(id: number, updateStudyPlanDto: UpdateStudyPlanDto) {
    return `This action updates a #${id} studyPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} studyPlan`;
  }
}
