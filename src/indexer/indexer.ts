import { ElasticSearchClient } from "./client/elasticsearch.client";
import * as flatten from 'flat';
import { indexDocs, createIndices, addMappingES7 } from '@searchkit/cli/lib/lib';

export class Indexer {
  private _config: any;
  private _queryById: any;
  private _queryAllData: any;
  private _collectionName: any;
  private _elasticSearchClient: ElasticSearchClient;

  constructor(config: any, documentByIdQuery: any, allDocumentsQuery: any, collection: any) {
    this._config = config;
    this._queryById = documentByIdQuery;
    this._queryAllData = allDocumentsQuery;
    this._collectionName = collection;
    this._elasticSearchClient = new ElasticSearchClient();
  }

  public async indexExists() {
    try {
      return await this._elasticSearchClient.client.indices.exists({
        index: this._config.index
      });
    } catch(error) {
        return false;
    }
  }

  public async createIndex() {
    await createIndices(this._config);
  }

  public async addMapping() {
    await addMappingES7(this._config);
  }

  public async deleteIndex() {
    try {
      await this._elasticSearchClient.client.indices.delete({
        index: this._config.index
      });
      console.info(`successfully deleted index: '${this._config.index}'`);
    } catch(error) {
      console.info(`error: ${JSON.stringify(error)}`);
    }
  }

  public async index(id: string) {
    try {
      console.info(`indexing '${this._collectionName}' document with id: '${id}'`);
      const document: any = await this._queryById(id);
      await indexDocs({ ...this._config, source: [flatten(document)] });
    } catch(error) {
        console.info(`Indexer.index - ${error.message} - ${JSON.stringify(error)}`);
    }
  }

  public async remove(id: string) {
    await this._elasticSearchClient.client.delete({
      index: this._config.index,
      id: id,
      refresh: 'true',
    });
  }

  public async indexDocuments () {
    console.info(`Indexer: Indexing documents for collection: '${this._collectionName}'`);
    try {
      console.info(`Indexing '${this._collectionName}' documents`);
      const documentsToIndex: Array<Object> = await this._queryAllData();
      documentsToIndex.forEach(async (doc: any) => {
        await indexDocs({ ...this._config, source: [flatten(doc)] });
      });
    } catch(error) {
      console.info(`indexDocuments - indexing '${this._collectionName}', ${error.message}`);
    }
  }
}
