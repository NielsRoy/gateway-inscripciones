import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Injectable()
export class TeacherService {
  create(createTeacherDto: CreateTeacherDto) {
    return 'This action adds a new teacher';
  }

  findAll() {
    return `This action returns all teacher`;
  }

  findOne(code: number) {
    return `This action returns a #${code} teacher`;
  }

  update(code: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${code} teacher`;
  }

  remove(code: number) {
    return `This action removes a #${code} teacher`;
  }
}
