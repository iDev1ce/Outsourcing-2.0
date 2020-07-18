import { Router } from "express";

import funcionarioResource from "@app/resources/funcionarioResource"
import middle from "@middlewares/funcionarioAuth"

class FuncionarioPublicRoutes {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes():void {
        this.routes.post("/auth", funcionarioResource.login)
    }
}

export default new FuncionarioPublicRoutes().routes