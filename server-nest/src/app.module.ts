import { Module } from '@nestjs/common';
import { PrivateMessagesGateWay } from './private-messages.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [PrivateMessagesGateWay],
})
export class AppModule {}
