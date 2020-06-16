import express, { Application } from "express";
import cors from "cors";

import routes from "./routes";
import "./database"

class App {
    public server:Application;

    constructor() {
        this.server = express()
        this.middlewares()
        this.routes()
    }

    public middlewares():void {
        this.server.use(express.json())
        this.server.use(cors())
    }

    public routes():void {
        this.server.use(routes)
    }
}

export default new App().server