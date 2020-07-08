import { Router } from "express";

import Impressora from "@app/resources/estoque/ImpressoraResource"
import middleFunc from "@middlewares/funcionarioAuth"

class ImpressoraRoute {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPrivateRoutes();
    }

    private getPrivateRoutes():void {
        this.routes.use(middleFunc)
        this.routes.get("/" || "", Impressora.getAll)
        this.routes.get("/:id", Impressora.getById)
        this.routes.post("/" || "", Impressora.insert)
        this.routes.put("/:id", Impressora.update)
        this.routes.delete("/:id", Impressora.delete)
        this.routes.post('/contratos', Impressora.contrato)
        this.routes.post("/chamados/:id", Impressora.chamado)
    }
}

export default new ImpressoraRoute().routes;