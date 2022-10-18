import { CommonConsumer } from '../common/common.consumer';
import { assetsIndexer as indexer } from '../../indexer/assets';

const CREATE = process.env.MESSAGE_QUEUE_RPC_CREATE || 'CREATE_ASSET_RPC';
const UPDATE = process.env.MESSAGE_QUEUE_RPC_UPDATE || 'UPDATE_ASSET_RPC';
const DELETE = process.env.MESSAGE_QUEUE_RPC_DELETE || 'DELETE_ASSET_RPC';

export class AssetsRPCConsumer extends CommonConsumer {

  constructor() {
    super('AssetsRPCConsumer');
  }

  public async consumeMessages() {
    this.assertRPCQueueCreate();
    this.assertRPCQueueUpdate();
    this.assertRPCQueueDelete();
  }

  private async assertRPCQueueCreate() {
    await this.channel.assertQueue(CREATE, { durable: false });
    this.channel.consume(CREATE, (message: any) => {
      const asset = JSON.parse(message.content.toString());
      indexer.index(asset.assetID);

      this.channel.sendToQueue(message.properties.replyTo, Buffer.from("true"), {
        correlationId: message.properties.correlationId
      });

      this.channel.ack(message);

    }, { noAck: false });
  }

  private async assertRPCQueueUpdate() {
    await this.channel.assertQueue(UPDATE);
    this.channel.consume(UPDATE, (message: any) => {
      const asset = JSON.parse(message.content.toString());
      indexer.index(asset.assetID);

      this.channel.sendToQueue(message.properties.replyTo, Buffer.from("true"), {
        correlationId: message.properties.correlationId
      });

      this.channel.ack(message);

    }, { noAck: false });
  }

  private async assertRPCQueueDelete() {
    await this.channel.assertQueue(DELETE);
    this.channel.consume(DELETE, (message: any) => {
      const asset = JSON.parse(message.content.toString());
      indexer.remove(asset.assetID);

      this.channel.sendToQueue(message.properties.replyTo, Buffer.from("true"), {
        correlationId: message.properties.correlationId
      });

      this.channel.ack(message);

    }, { noAck: false });
  }
}