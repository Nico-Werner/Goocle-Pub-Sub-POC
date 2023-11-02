import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PublisherService } from './app.service';
import { ListenerService } from './appListener.service';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { PubSubInitializer } from './initializePubSub';
import { PubSubService } from './pubSubService';

@Module({
  imports: [],
  controllers: [AppController, EmailController],
  providers: [PublisherService, ListenerService, EmailService, PubSubInitializer, PubSubService],
})
export class AppModule {}
