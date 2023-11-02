import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PubSubInitializer } from './initializePubSub';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const pubsub = app.get(PubSubInitializer); // inject the PubSubService
  await pubsub.quickstart(); // start local subscription and topic
  await app.listen(3000);
}
bootstrap();
