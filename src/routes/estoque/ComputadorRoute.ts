import { Router } from "express";

import Computador from "../../app/resources/estoque/ComputadorResource";
import middle from "../../middlewares/usuarioAuth"

class ComputadorResource {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPrivateRoutes();
    }

    private getPrivateRoutes():void {
        this.routes.use(middle)
        this.routes.get("/" || "", Computador.getAll)
        this.routes.get("/:id", Computador.getById)
        this.routes.post("/" || "", Computador.insert)
        this.routes.put("/:id", Computador.update)
        this.routes.delete("/:id", Computador.delete)
    }
}

export default new ComputadorResource().routes;