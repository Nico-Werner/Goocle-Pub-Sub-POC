// Imports the Google Cloud client library
import {PubSub, Topic, Subscription} from '@google-cloud/pubsub';
import { Injectable } from '@nestjs/common';


/*
  This is executed when running the app with `pnpm run start`
  It creates a topic and a subscription to that topic, and has it running.
  TODO: it could be more efficient to check if the topic and subscription exist before creating them.
  Right now you need to stop gcloud Emulator with CTRL+C, run this command unset PUBSUB_EMULATOR_HOST, then start the emulator again.
  After it you need to set the environment variable PUBSUB_EMULATOR_HOST again, in MACOS you can do it with this command:
    $(gcloud beta emulators pubsub env-init)
  Then you can run the app again with `pnpm run start`
*/
@Injectable()
export class PubSubInitializer {
    async quickstart(
        projectId: string = 'PROJECT_ID', // Your Google Cloud Platform project ID
        topicNameOrId: string = 'TOPIC_NAME', // Name for the new topic to create
        subscriptionName: string = 'SUBSCRIPTION_NAME' // Name for the new subscription to create
        ) {
        // Instantiates a client
        const pubsub: PubSub = new PubSub({projectId});

        // Creates a new topic
        const [topic] = await pubsub.createTopic(topicNameOrId);
        console.log(`Topic ${topic.name} created.`);


        // Set to an HTTPS endpoint of your choice. If necessary, register
        // (authorize) the domain on which the server is hosted.
        // This is needed to create the Push Subscription
        const options = {
            pushConfig: {
              pushEndpoint: `http://localhost:3000/listen`,
            },
          };

        // Creates a subscription on that new topic. This is a Push Subscription, so it will send the message to the endpoint specified in the options
        console.log(`Subscription ${subscriptionName} Starting.`);
        const [subscription] = await pubsub.topic(topicNameOrId).createSubscription(subscriptionName, options);
        console.log(`Subscription ${subscription.name} created.`);

        // Receive callbacks for errors on the subscription
        subscription.on('error', error => {
            console.error('Received error:', error);
            process.exit(1);
        });
    }
}
