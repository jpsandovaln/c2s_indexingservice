import express from 'express';
import { AssetService } from '../../services/assets/asset.service';

class AssetsController {

  private assetService: AssetService;
  constructor() {
    this.assetService = new AssetService();
  }

  reIndex(req: express.Request, res: express.Response) {
    // get all assets from apollo and add to elasticsearch
    this.assetService.reIndex();
    res.status(200).send("All data were indexed.");
  }

  addIndex(req: express.Request, res: express.Response) {
    const assetId: string = req.params.assetId as string;
    this.assetService.addIndex(assetId);
    res.status(200).send(`The asset ${assetId} was added into indexer correctly.`);
  }

  updateIndex(req: express.Request, res: express.Response) {
    const assetId: string = req.params.assetId as string;
    this.assetService.updateIndex(assetId);
    res.status(200).send(`The asset ${assetId} was updated into indexer correctly.`);
  }

  deleteIndex(req: express.Request, res: express.Response) {
    const assetId: string = req.params.assetId as string;
    this.assetService.deleteIndex(assetId);
    res.status(200).send(`The asset ${assetId} was deleted into indexer correctly.`);
  }

}

export default new AssetsController();
