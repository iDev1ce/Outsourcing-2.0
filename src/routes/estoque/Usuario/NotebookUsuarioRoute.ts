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
        this.routes.get("/" || "", Notebook.getAllCliente)
        this.routes.get("/:id", Notebook.getById)
        this.routes.post("/contrato", Notebook.contrato)
        this.routes.post("/chamados", Notebook.chamados)
    }

}

export default new NotebookRoute().routes;