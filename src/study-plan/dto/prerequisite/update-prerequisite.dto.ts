import { PartialType } from '@nestjs/swagger';
import { PrerequisiteDto } from './prerequisite.dto';

export class UpdatePrerequisiteDto extends PartialType(PrerequisiteDto) {}
