import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  controllers: [EmailController],
  providers: [EmailService],
  imports: [RedisModule],
})
export class EmailModule {}
