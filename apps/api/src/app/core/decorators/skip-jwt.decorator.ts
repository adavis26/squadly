import { createParamDecorator, SetMetadata } from '@nestjs/common';

export const SkipJwt = () => SetMetadata('SkipJwt', true);
