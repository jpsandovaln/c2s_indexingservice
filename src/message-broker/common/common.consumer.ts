import * as amqp from 'amqplib'

const RABBITMQ = process.env.RABBITMQ_URL || 'amqp://localhost';

export abstract class CommonConsumer {
  conn: any;
  channel: any;
  name: string;

  constructor(name: string) {
    this.init();
    this.name = name;
  }

  private async init() {
    this.conn = await amqp.connect(RABBITMQ);
    this.channel = await this.conn.createChannel();
    this.consumeMessages();
  }

  public getName() {
    return this.name;
  }

  abstract consumeMessages(): void;
}
