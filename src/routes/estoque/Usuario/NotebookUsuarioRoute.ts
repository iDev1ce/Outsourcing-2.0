import { Router } from "express";

import Notebook from "@app/resources/estoque/NotebookResource"
import middleUser from "@middlewares/usuarioAuth"

class NotebookRoute {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes():void { 
        this.routes.use(middleUser)
        this.routes.get("/" || "", Notebook.getAll)
        this.routes.get("/:id", Notebook.getById)
        this.routes.post("/" || "", Notebook.insert)
        this.routes.put("/:id", Notebook.update)
        this.routes.delete("/:id", Notebook.delete)
        this.routes.post("/contrato", Notebook.contrato)
    }


}

export default new NotebookRoute().routes;