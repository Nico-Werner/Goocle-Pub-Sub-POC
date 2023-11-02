import { Body, Controller, Post } from '@nestjs/common';
import { PublisherService } from './app.service';
import { ListenerService } from './appListener.service';
import { MessageInput } from './messageDto';
import { Data } from './pubSubDataInterface'
import { MessageContent } from './messageContentInterface';

@Controller()
export class AppController {
  constructor(private readonly appService: PublisherService, private readonly listenerService: ListenerService) {}

  // Executes the Publisher Service that calls the Pub/Sub Service that creates the message and uses the Push Subscription to send it to the listener
  @Post("/publish")
  publish(@Body() input: MessageInput): Promise<string> {
    return this.appService.publish(input.type, input.message);
  }

  // Executes the Listener Service. This is called by the Push Subscription when a message is sent to it.
  @Post("/listen")
  async listen(@Body() request: Data): Promise<void> {
    // Get the JSON body of the request
    const data = request.message;
    console.log("message " + request.message.data);
    // Decode the base64-encoded message data
    const bufferMessageData = Buffer.from(data.data, 'base64').toString('utf-8');
    console.log("message data " + bufferMessageData);

    // Trasform the bufferMessageData into a MessageContent object
    const messageContent: MessageContent = JSON.parse(bufferMessageData);
    // Send the messageContent to the listenerService
    await this.listenerService.listen(messageContent);
    return;
  }

}
