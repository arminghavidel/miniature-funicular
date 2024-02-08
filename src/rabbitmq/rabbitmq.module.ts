import { Module, Global } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      // configuration settings if needed
    }),
  ],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
