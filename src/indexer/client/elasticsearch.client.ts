import { Client } from '@elastic/elasticsearch';

const elasticSearchUrl: string = process.env.ELEASTICSEARCH_URL || "http://localhost";
const elasticSearchPort: string = process.env.ELEASTICSEARCH_PORT || "9200";

const url: string =`${elasticSearchUrl}:${elasticSearchPort}`;

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
