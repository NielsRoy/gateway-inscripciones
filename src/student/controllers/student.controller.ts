import { Controller, Get, Post, Body, Param, ParseIntPipe, Inject, UseGuards } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { PROCESSOR_SERVICE } from '../../config/services';
import { ClientProxy } from '@nestjs/microservices';
import { LoginStudentDto } from '../dto/login-student.dto';
import { AuthGuard } from '../guards/auth.guard';
import { GetAuthStudentId } from '../decorators/get-auth-student-id.decorator';

@ApiTags('Estudiante')
@Controller('student')
export class StudentController {

  constructor(
    @Inject(PROCESSOR_SERVICE) private readonly processorClient: ClientProxy,
  ) { }

  @Post()
  create(
    @Body() dto: CreateStudentDto,
  ) {
    return this.processorClient.send('register_student', dto);
  }

  @Post('login')
  login(
    @Body() dto: LoginStudentDto,
  ) {
    return this.processorClient.send('login_student', dto);
  }

  @UseGuards(AuthGuard)
  @Get('check-auth-status')
  checkAuthStatus(@GetAuthStudentId() studentId: number) {
    return this.processorClient.send('check_auth_status', { studentId });
  }

  @UseGuards(AuthGuard)
  @Get('subjects-to-enroll')
  getSubjectsForEnroll(@GetAuthStudentId() studentId: number) {
    return this.processorClient.send('get_subjects_to_enroll', { studentId });
  }

  @UseGuards(AuthGuard)
  @Get('historic')
  getStudentHistoric(@GetAuthStudentId() studentId: number) {
    return this.processorClient.send('get_student_historic', { studentId });
  }
}
