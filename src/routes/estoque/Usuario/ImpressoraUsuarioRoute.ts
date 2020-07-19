import { Router } from "express";

import Impressora from "@app/resources/estoque/ImpressoraResource"
import middleUser from "@middlewares/usuarioAuth"

class ImpressoraRoute {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPrivateRoutes();
    }

    private getPrivateRoutes():void {
        this.routes.use(middleUser)
        this.routes.get("/" || "", Impressora.getAll)
        this.routes.get("/:id", Impressora.getById)
        this.routes.post('/contratos', Impressora.contrato)
        this.routes.post("/chamados", Impressora.chamado)
    }
}

export default new ImpressoraRoute().routes;