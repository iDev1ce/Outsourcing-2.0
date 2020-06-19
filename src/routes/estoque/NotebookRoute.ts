import { Router } from "express";

import Notebook from "../../app/resources/estoque/NotebookResource"
import middle from "../../middlewares/usuarioAuth"
import middleFunc from "../../middlewares/funcionarioAuth"

class NotebookRoute {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes():void {
        this.routes.use(middleFunc)
        this.routes.get("/" || "", Notebook.getAll)
        this.routes.get("/:id", Notebook.getById)
        this.routes.post("/" || "", Notebook.insert)
        this.routes.put("/:id", Notebook.update)
        this.routes.delete("/:id", Notebook.delete)
    }


}

export default new NotebookRoute().routes;