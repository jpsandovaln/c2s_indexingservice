import * as ampq from 'amqplib';

const RABBITMQ = process.env.RABBITMQ_URL || 'amqp://localhost';

export abstract class CommonConsumer {
  conn: any;
  channel: any;
  name: string;
  
  constructor(name: string) {
    this.init();
    this.name = name;
    this.consumeMessages();
  }

  private async init() {
    this.conn = await ampq.connect(RABBITMQ);
    this.channel = await this.conn.createChannel();
  }

  public getName() {
    return this.name;
  }

  abstract consumeMessages(): void;
}
