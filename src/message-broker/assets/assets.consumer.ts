import { AssetService } from '../../services/assets/asset.service';
import { ICollectionIndex } from '../../services/common/common.interface';
import { CommonConsumer } from '../common/common.consumer';

const CREATE = process.env.MESSAGE_QUEUE_CREATE || 'CREATE_ASSET';
const UPDATE = process.env.MESSAGE_QUEUE_UPDATE || 'UPDATE_ASSET';
const DELETE = process.env.MESSAGE_QUEUE_DELETE || 'DELETE_ASSET';


export class AssetsConsumer extends CommonConsumer {

  constructor() {
    super('AssetsConsumer');
  }

  public async consumeMessages() {
    this.assertQueueCreate();
    this.assertQueueUpdate();
    this.assertQueueDelete();
  }

  private async assertQueueCreate() {
    await this.channel.assertQueue(CREATE);
    this.channel.consume(CREATE,async (message: any) => {
      const id = JSON.parse(message.content.toString());
      const assetService: ICollectionIndex = new AssetService();
      assetService.addIndex(id);
    })
  }

  private async assertQueueUpdate() {
    await this.channel.assertQueue(UPDATE);
    this.channel.consume(UPDATE,async (message: any) => {
      const id = JSON.parse(message.content.toString());
      const assetService: ICollectionIndex = new AssetService();
      assetService.updateIndex(id);
    })
  }

  private async assertQueueDelete() {
    await this.channel.assertQueue(DELETE);
    this.channel.consume(DELETE,async (message: any) => {
      const id = JSON.parse(message.content.toString());
      const assetService: ICollectionIndex = new AssetService();
      assetService.deleteIndex(id);
    })
  }
}
