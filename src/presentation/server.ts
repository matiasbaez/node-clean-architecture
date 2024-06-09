import express, { Router } from "express";
import compression from "compression";

interface Options {
  port: number;
  routes: Router;
  publicPath?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, publicPath = "public", routes } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  start() {
    this.app.use(express.static(this.publicPath));
    // this.app.use(express.urlencoded({ extended: true }));
    this.app.use(compression());

    // API Routes
    this.app.use(this.routes);

    // SPA
    // this.app.get("*", (req, res) => {
    //     const indexPath = path.join(`${__dirname}../../../public/index.html`);
    //     return res.sendFile(indexPath);
    // });

    this.app.listen(this.port, () => {
      console.log("Server started on port 3000");
    });
  }
}
