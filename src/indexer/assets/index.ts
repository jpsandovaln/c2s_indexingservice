import { Indexer } from '../indexer';
import { getAssetById, getAllAssets, } from './queries';
import { ElasticSearchClient } from '../client/elasticsearch.client';

const INDEX_NAME = 'assets';
const url = new ElasticSearchClient();

const indexingConfig = {
  index: INDEX_NAME,
  host: url.elasticSearchUrl,
  fields: [
    {
      fieldName: 'id',
      stored: true,
      searchable: false,
      sourceOptions: {
        path: 'assetID'
      }
    },
    {
      fieldName: 'assetID',
      stored: true,
      searchable: false,
      sourceOptions: {
        path: 'assetID'
      }
    },
    {
      fieldName: 'previewURL',
      stored: true,
      searchable:true,
      sourceOptions: {
        path: 'previewURL'
      }
    },
    {
      fieldName: 'preview_fileName',
      stored: true,
      searchable: true,
      facet: false,
      sourceOptions: {
        path: 'preview.fileName'
      }
    },
    {
      fieldName: 'preview_binaryID',
      stored: true,
      sourceOptions: {
        path: 'preview.binaryID'
      }
    },
    {
      fieldName: 'preview_fileType',
      stored: true,
      searchable: true,
      facet: true,
      sourceOptions: {
        path: 'preview.fileType'
      }
    },
    {
      fieldName: 'preview_fileSize',
      stored: true,
      searchable: true,
      facet: true,
      sourceOptions: {
        path: 'preview.fileSize'
      }
    }
  ]
}; 

export const assetsIndexer = new Indexer(indexingConfig, getAssetById, getAllAssets, INDEX_NAME);

  