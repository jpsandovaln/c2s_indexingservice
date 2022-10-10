import { HttpLink  } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { from } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch'

const APOLLO_SERVER_URL = process.env.APOLLO_SERVER_URL || 'http://localhost:3101';
const APOLLO_API_KEY = process.env.APOLLO_API_KEY || '5885e061-e358-4e4a-8ba4-f5d49d6edf6b';

export class ApolloServerClient {
  private _httpLink: HttpLink;
  private _cache: InMemoryCache;
  private _autMiddleware: any;

  constructor() {
    this._cache = new InMemoryCache({ addTypename: false });
    this._httpLink = new HttpLink({
      uri: APOLLO_SERVER_URL,
      fetch: fetch as any 
    });
    this._autMiddleware = setContext(async() => ({
      headers: {
        'x-apikey': APOLLO_API_KEY,
      }
    }));
  }

  public getClient ()  {
    return new ApolloClient({
      link: from([this._autMiddleware, this._httpLink]),
      cache: this._cache,
    });
  }
}
