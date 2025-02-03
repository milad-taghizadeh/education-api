import { Module } from '@nestjs/common';
import { multerOptions } from './config/multer.config';

@Module({
  providers: [
    {
      provide: 'MULTER_OPTIONS',
      useValue: multerOptions,
    },
  ],
  exports: ['MULTER_OPTIONS'],
})
export class ConfigModule {}
