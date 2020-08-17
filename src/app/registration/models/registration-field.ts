import { IsString, IsBoolean, ValidateNested, IsIn, IsOptional, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

import { FieldValidation } from './field-validation';

export class RegistrationField {
  @IsIn(['text', 'email', 'phone', 'password'])
  type: 'text' | 'email' | 'phone' | 'password';
  @IsString()
  name: string;
  @IsString()
  label: string;
  @IsBoolean()
  required: boolean;
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldValidation)
  validations?: FieldValidation[];
}
