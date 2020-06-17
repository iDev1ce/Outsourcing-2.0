import { Router } from "express";

import Impressora from "../../app/resources/estoque/ImpressoraResource";
import middle from "../../middlewares/usuarioAuth"

class ImpressoraRoute {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPrivateRoutes();
    }

    private getPrivateRoutes():void {
        this.routes.use(middle)
        this.routes.get("/" || "", Impressora.getAll)
        this.routes.get("/:id", Impressora.getById)
        this.routes.post("/" || "", Impressora.insert)
        this.routes.put("/:id", Impressora.update)
        this.routes.delete("/:id", Impressora.delete)
    }


}

export default new ImpressoraRoute().routes;