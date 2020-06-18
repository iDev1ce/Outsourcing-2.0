import { Router } from "express";

import Computador from "../../app/resources/estoque/ComputadorResource";
import middleUser from "../../middlewares/usuarioAuth"
import middleFunc from "../../middlewares/funcionarioAuth"

class ComputadorResource {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPrivateRoutes();
    }

    private getPrivateRoutes():void {
        this.routes.use(middleFunc) || this.routes.use(middleUser)
        this.routes.get("/" || "", Computador.getAll)
        this.routes.get("/:id", Computador.getById)
        this.routes.post("/" || "", Computador.insert)
        this.routes.put("/:id", Computador.update)
        this.routes.delete("/:id", Computador.delete)
    }
}

export default new ComputadorResource().routes;