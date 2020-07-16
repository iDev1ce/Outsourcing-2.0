import { Router } from "express";

import ContratoResource from '@app/resources/contratoResource'

class ContratoRoutes {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes():void {
        this.routes.post("/criar", ContratoResource.insert)
    }
}

export default new ContratoRoutes().routes