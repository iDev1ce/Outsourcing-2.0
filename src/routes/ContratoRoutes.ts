import { Router } from "express";

import ContratoResource from "@app/resources/contratoResource"

class ContratoRoutes {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes():void {
        this.routes.post("/criar", ContratoResource.insert)
        this.routes.get("/", ContratoResource.getClienteAll)
        this.routes.get("/:id", ContratoResource.getById)
    }
}

export default new ContratoRoutes().routes
