import { Router } from "express";

import funcionarioResource from "@app/resources/funcionarioResource"
import middle from "@middlewares/funcionarioAuth"

class FuncionarioRoutes {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes():void {
        this.routes.post("/auth", funcionarioResource.login)
        this.routes.get("/contratos", middle, funcionarioResource.getAllContratos)
        this.routes.get("/chamados", middle, funcionarioResource.getAllChamados)
    }
}

export default new FuncionarioRoutes().routes