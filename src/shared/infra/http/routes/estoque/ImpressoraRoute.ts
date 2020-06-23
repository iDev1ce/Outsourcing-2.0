import { Router } from "express";

import Impressora from "../../../../../app/resources/estoque/ImpressoraResource"
import middleUser from "../../middlewares/usuarioAuth"
import middleFunc from "../../middlewares/funcionarioAuth"

class ImpressoraRoute {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPrivateRoutes();
    }

    private getPrivateRoutes():void {
        this.routes.use(middleFunc) || this.routes.use(middleUser)
        this.routes.get("/" || "",middleFunc , Impressora.getAll)
        this.routes.get("/:id", Impressora.getById)
        this.routes.post("/" || "", Impressora.insert)
        this.routes.put("/:id", Impressora.update)
        this.routes.delete("/:id", Impressora.delete)
    }
}

export default new ImpressoraRoute().routes;