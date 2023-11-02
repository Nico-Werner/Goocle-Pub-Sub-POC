import { Injectable } from "@nestjs/common";
// Imports the Google Cloud client library
import { PubSub } from '@google-cloud/pubsub';

/*
    Service that creates a message and publishes it to the Pub/Sub Topic. As the topic is configured to use a Push Subscription, 
    the message is sent to the listener. In this case the /listen endpoint of the app controller.
*/
@Injectable()
export class PubSubService {

    private readonly topicNameOrId = 'TOPIC_NAME';
    // Creates a client; cache this for further use
    private pubSubClient = new PubSub();

    async publishToMessageSubscription(type: string, message: string): Promise<string> {
        // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
        // As it is required by the google cloud pubsub api to publish a message
        const data = JSON.stringify(
            {
            type: type,
            message: message
            }
        );
        const dataBuffer = Buffer.from(data);
        const messageId = await this.pubSubClient.topic(this.topicNameOrId).publishMessage( { data: dataBuffer } );
        console.log(`Message ${messageId} published.`);
        return messageId;
    }

}