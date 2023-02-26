import { Module } from '@nestjs/common';
import { SystemClock } from './system-clock';
import { Clock } from './clock';

@Module({
  providers: [
    {
      provide: Clock,
      useClass: SystemClock,
    },
  ],
  exports: [Clock],
})
export class ClockModule {}
