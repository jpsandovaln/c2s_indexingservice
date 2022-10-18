import express from "express";
import { CommonRoutes } from "../common/common.route";
import AssetsController from './assets.controller';

export class AssetsRoutes extends CommonRoutes {
  constructor(app: express.Application) {
    super(app, 'AssetsRoutes');
  }

  configureRoutes(): express.Application {
    this.app.route('/api/v1/reindex').post(AssetsController.reIndex);
    this.app.route('/api/v1/assets/:assetId')
      .post(AssetsController.addIndex)
      .put(AssetsController.updateIndex)
      .delete(AssetsController.deleteIndex);
    return this.app;
  }
}