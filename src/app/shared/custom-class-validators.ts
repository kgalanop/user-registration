import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function HasProperTypeBasedOn(property: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'HasProperTypeBasedOn',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          if (relatedValue === 'regex') {
            let validRegex = true;
            try {
              const regex = new RegExp(value);
            } catch (e) {
              validRegex = false;
            }
            return validRegex;
          } else if (relatedValue === 'maxlength' || relatedValue === 'minlength') {
            return typeof value === 'number' ;
          }
          return true;
        },
        defaultMessage(args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          return `${args.property} does not have the proper type based on ${relatedValue} value of ${relatedPropertyName} property`;
        }
      },
    });
  };
}
