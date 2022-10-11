import { ICollectionIndex } from '../common/common.interface';
import { ApolloServerClient } from '../../apollo-client/apollo.client';
import { GET_ASSETS_BY_ID } from './asset.query';

export class AssetService implements ICollectionIndex{

  private apolloClient: ApolloServerClient;

  constructor() {
    this.apolloClient = new ApolloServerClient();
  }

  public async addIndex(id: string) {
    console.info('AssetService ++++++++------- = ' + id);
    const { data } = await this.apolloClient.getClient().query({
      query: GET_ASSETS_BY_ID,
      variables: { id },
    });
    console.info('AssetService ++++++++ 2');
    console.info(data);
    console.info('AssetService ++++++++ 3');
    // indexar to elasticsearch
  }

  public updateIndex(id: string) {
    // llamar a grapql
    // indexar
  }

  public deleteIndex(id: string) {
    // llamar a grapql
    // indexar
  }

  public reIndex() {
    // llamar a grapql
    // indexar
  }
}
