import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class CreateRegistrationDetailDto {

  @ApiProperty({
    description: 'ID de la inscripción',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  registrationId: number;

  @ApiProperty({
    description: 'ID del Grupo - Materia',
    nullable: false,
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  subjectGroupId: number;
}
