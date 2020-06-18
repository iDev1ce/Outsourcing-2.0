import express, { Application, Request, Response, NextFunction } from "express";
import "express-async-errors"
import cors from "cors";

import routes from "./routes";
import AppError from "./errors/AppError"

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
        
        this.server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            if (err instanceof AppError) {
                return res.status(err.statusCode).send({
                    status: "error",
                    message: err.message,
                })
            }

            console.error(err)

            return res.status(500).send({
                status: "error",
                message: "Internal server error"
            })
        })
    }

    public routes():void {
        this.server.use(routes)
    }
}

export default new App().server