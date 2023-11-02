import { Injectable } from '@nestjs/common';
import { PubSubService } from './pubSubService';

@Injectable()
export class PublisherService {
  
  constructor(private readonly pubSubService: PubSubService) { }

  publish(type: string, message: string): Promise<string> {
    return this.publishMessage(type, message);
  }

  // Publishes the message to the topic by calling the Pub/Sub Service
  async publishMessage(type: string, message: string): Promise<string> {
    try {
      return this.pubSubService.publishToMessageSubscription(type, message);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
      return null;
    }
  }

}
