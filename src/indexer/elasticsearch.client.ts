import { Client } from '@elastic/elasticsearch';

const url: string = process.env.ELEASTICSEARCH_URL || "http://localhost";

export class ElasticSearchClient {
  private _client: Client;
  private _elasticSearchUrl: string;

  constructor() {
    this._elasticSearchUrl = url;
    this._client = new Client({
       node: this._elasticSearchUrl
    });
  }

  public get client() {
    return this._client;
  }

  public get elasticSearchUrl() {
    return this._elasticSearchUrl;
  }
}
