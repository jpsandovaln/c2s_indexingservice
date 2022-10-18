import * as express from "express";
import * as http from 'http';
import * as bodyparser from 'body-parser';
import * as cors from 'cors';
import { AssetsRoutes } from "./api/assets/assets.routes";
import { CommonRoutes } from "./api/common/common.route";
import { AssetsConsumer } from "./message-broker/assets/assets.consumer";
import { AssetsRPCConsumer } from './message-broker/assets/assets.rpc.consumer';
import { CommonConsumer } from "./message-broker/common/common.consumer";

class App {
  app: express.Application;
  routes: Array<CommonRoutes>;
  consumers: Array<CommonConsumer>;
  server: http.Server

  constructor() {
    this.app = express();
    this.app.use(bodyparser.json());
    this.app.use(cors());
    this.routes = [];
    this.consumers = [];
    this.server = http.createServer(this.app);
  }

  private addRoutes() {
    this.routes.push(new AssetsRoutes(this.app));
  }

  public startServer(port: string) {
    this.addRoutes();
    this.server.listen(port, () => {
      console.log(`Indexing service ready at http://localhost:${port}`);
      this.routes.forEach((route: CommonRoutes) => {
        console.log(`Routes configured for ${route.getName()}`);
      });
    });
  }

  private addConsumers() {
    this.consumers.push(new AssetsConsumer());
    this.consumers.push(new AssetsRPCConsumer());
  }

  public startMessageBroker() {
    this.addConsumers();
    this.consumers.forEach((consumer: CommonConsumer) => {
      console.log(`Consumer configured for ${consumer.getName()}`);
    });
  }
};

const port: string = process.env.SERVER_PORT || "3030";
const app = new App();
app.startMessageBroker();
app.startServer(port);
