import { IsString } from 'class-validator';
import { HasProperTypeBasedOn } from 'src/app/shared/custom-class-validators';

export class FieldValidation {
  @IsString()
  name: string;
  @IsString()
  message: string;
  @HasProperTypeBasedOn('name')
  value: string | number;
}
