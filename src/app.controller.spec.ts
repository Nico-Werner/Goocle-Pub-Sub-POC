import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PublisherService } from './app.service';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController, EmailController],
      providers: [PublisherService, EmailService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
