import { Injectable, Logger } from '@nestjs/common';
import { Connection, Channel, connect } from 'amqplib';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RabbitmqService {
  private readonly logger = new Logger(RabbitmqService.name);
  private connection: Connection;
  private channel: Channel;

  constructor(private readonly configService: ConfigService) {}

  async connectToRabbitMQ() {
    try {
      this.connection = await connect(this.configService.get<string>('RABBITMQ_URI'));
      this.channel = await this.connection.createChannel();
      this.logger.log('Connected to RabbitMQ');
    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', error);
      throw error;
    }
  }

  async setupQueue(queueName: string) {
    try {
      await this.channel.assertQueue(queueName);
      this.logger.log(`Queue ${queueName} is ready`);
    } catch (error) {
      this.logger.error(`Failed to assert queue ${queueName}`, error);
      throw error;
    }
  }

  async sendToQueue(queueName: string, message: string) {
    try {
      this.channel.sendToQueue(queueName, Buffer.from(message));
      this.logger.log(`Message sent to queue ${queueName}: ${message}`);
    } catch (error) {
      this.logger.error(`Failed to send message to queue ${queueName}`, error);
      throw error;
    }
  }

  // Call this method to cleanly close the connection and channel
  async closeConnection() {
    try {
      await this.channel.close();
      await this.connection.close();
      this.logger.log('RabbitMQ connection closed');
    } catch (error) {
      this.logger.error('Error closing RabbitMQ connection', error);
      throw error;
    }
  }
}
