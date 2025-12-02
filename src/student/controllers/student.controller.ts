import { Controller, Get, Post, Body, Inject, UseGuards } from '@nestjs/common';
import { CreateStudentDto } from '../dto/create-student.dto';
import { ApiTags } from '@nestjs/swagger';
import { NATS_SERVICE } from '../../config/injection-tokens';
import { ClientProxy } from '@nestjs/microservices';
import { LoginStudentDto } from '../dto/login-student.dto';
import { AuthGuard } from '../guards/auth.guard';
import { GetAuthStudentId } from '../decorators/get-auth-student-id.decorator';

@ApiTags('Estudiante')
@Controller('student')
export class StudentController {

  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy,
  ) { }

  @Post()
  create(
    @Body() dto: CreateStudentDto,
  ) {
    return this.natsClient.send('register_student', dto);
  }

  @Post('login')
  login(
    @Body() dto: LoginStudentDto,
  ) {
    return this.natsClient.send('login_student', dto);
  }

  @UseGuards(AuthGuard)
  @Get('check-auth-status')
  checkAuthStatus(@GetAuthStudentId() studentId: number) {
    return this.natsClient.send('check_auth_status', { studentId });
  }

  @UseGuards(AuthGuard)
  @Get('subjects-to-enroll')
  getSubjectsForEnroll(@GetAuthStudentId() studentId: number) {
    return this.natsClient.send('get_subjects_to_enroll', { studentId });
  }

  @UseGuards(AuthGuard)
  @Get('historic')
  getStudentHistoric(@GetAuthStudentId() studentId: number) {
    return this.natsClient.send('get_student_historic', { studentId });
  }
}
