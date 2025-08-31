import { PartialType } from '@nestjs/swagger';
import { CreateRegistrationDetailDto } from './create-registration-detail.dto';

export class UpdateRegistrationDetailDto extends PartialType(CreateRegistrationDetailDto) {}
