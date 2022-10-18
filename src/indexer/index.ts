import { assetsIndexer }  from './assets';

const INDEXER = {
  assets: assetsIndexer
};

export class Indices {
  public initIndices(indexNames: Array<any>) {
    indexNames.map(async indexName => {
      const indexer: any = INDEXER[indexName as keyof Object];
      if (!indexer) {
        console.info(`Indexing configuration for [${indexName}] could not be found.`);
      }
      const exists = await indexer.indexExists();
      if (exists) {
        console.info(`Index with name [${indexName}] found.`);
        await indexer.deleteIndex();
      }
      console.info(`Creating Index with name: ${indexName}.`);
      await indexer.createIndex();
      await indexer.addMapping();
      console.info(`Index [${indexName}] was created.`);
      await indexer.indexDocuments();
    });
  }
}
