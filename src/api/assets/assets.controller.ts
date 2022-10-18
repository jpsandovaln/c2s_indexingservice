import express from 'express';
import { assetsIndexer as indexer } from '../../indexer/assets';
import { Indices } from '../../indexer'
class AssetsController {

  reIndex(req: express.Request, res: express.Response) {
    const index = new Indices();
    index.initIndices(['assets']);
    res.status(200).send("All data were indexed.");
  }

  addIndex(req: express.Request, res: express.Response) {
    const assetId: string = req.params.assetId as string;
    indexer.index(assetId);
    res.status(200).send(`The asset ${assetId} was added into indexer correctly.`);
  }

  updateIndex(req: express.Request, res: express.Response) {
    const assetId: string = req.params.assetId as string;
    indexer.index(assetId);
    res.status(200).send(`The asset ${assetId} was updated into indexer correctly.`);
  }

  deleteIndex(req: express.Request, res: express.Response) {
    const assetId: string = req.params.assetId as string;
    indexer.remove(assetId);
    res.status(200).send(`The asset ${assetId} was deleted into indexer correctly.`);
  }

}

export default new AssetsController();
