import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { EnrollmentDto } from "../dto/enrollment.dto";
import { firstValueFrom } from "rxjs";
import { AuthGuard } from "../../student/guards/auth.guard";
import { GetAuthStudentId } from "../../student/decorators/get-auth-student-id.decorator";
import { PROCESSOR_SERVICE } from "../../config/services";

@ApiTags('Inscripción')
@Controller('enrollment')
export class EnrollmentController {

  constructor(
    @Inject(PROCESSOR_SERVICE)
    private readonly processorClient: ClientProxy,
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Crear solicitud de inscripción' })
  @ApiResponse({ status: 202, description: 'Solicitud de inscripción creada con estado PENDING' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async createEnrollment(
    @Body() dto: EnrollmentDto,
    @GetAuthStudentId('studentId') studentId: number,
  ) {
    // Asegurar que el studentId del token coincide con el del body
    // dto.studentId = studentId;

    const result = await firstValueFrom(
      this.processorClient.send('create_enrollment_request', { ...dto, studentId })
    );

    return result;
  }

  @Get(':id/status')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Consultar estado de inscripción (polling)' })
  @ApiResponse({ status: 200, description: 'Estado de la inscripción' })
  @ApiResponse({ status: 404, description: 'Inscripción no encontrada' })
  async getEnrollmentStatus(
    @Param('id', ParseIntPipe) enrollmentId: number,
  ) {
    const result = await firstValueFrom(
      this.processorClient.send('get_enrollment_status', { enrollmentId })
    );

    return result;
  }

  @Get('student/:studentId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener historial de inscripciones del estudiante' })
  @ApiResponse({ status: 200, description: 'Lista de inscripciones del estudiante' })
  async getStudentEnrollments(
    @Param('studentId', ParseIntPipe) studentId: number,
    @GetAuthStudentId('studentId') tokenStudentId: number,
  ) {
    // Verificar que el estudiante solo pueda ver sus propias inscripciones
    if (studentId !== tokenStudentId) {
      throw new Error('No autorizado para ver inscripciones de otro estudiante');
    }

    const result = await firstValueFrom(
      this.processorClient.send('get_student_enrollments', { studentId })
    );

    return result;
  }

  @Get('student/:studentId/period/:periodId')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener inscripción del estudiante en un período específico' })
  @ApiResponse({ status: 200, description: 'Inscripción del estudiante en el período' })
  async getStudentEnrollmentByPeriod(
    @Param('studentId', ParseIntPipe) studentId: number,
    @Param('periodId', ParseIntPipe) periodId: number,
    @GetAuthStudentId('studentId') tokenStudentId: number,
  ) {
    // Verificar que el estudiante solo pueda ver sus propias inscripciones
    if (studentId !== tokenStudentId) {
      throw new Error('No autorizado para ver inscripciones de otro estudiante');
    }

    const result = await firstValueFrom(
      this.processorClient.send('get_student_enrollments', { studentId, periodId })
    );

    return result;
  }
}