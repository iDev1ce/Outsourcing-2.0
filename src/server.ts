import express, { Application } from "express";
import "express-async-errors"
import cors from "cors";

import routes from "./routes";
import uploadConfig from "./config/upload"

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
        this.server.use("/files", express.static(uploadConfig.directory))
        this.server.use(cors())
    }

    public routes():void {
        this.server.use(routes)
    }
}

export default new App().server