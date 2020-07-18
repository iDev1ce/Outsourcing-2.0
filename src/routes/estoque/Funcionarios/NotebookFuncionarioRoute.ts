import { Router } from "express";
import multer from "multer";

import Notebook from "@app/resources/estoque/NotebookResource"
import middleFunc from "@middlewares/funcionarioAuth"
import uploadConfig from "@config/upload"

const upload = multer(uploadConfig);

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
        this.routes.patch("/upload/:id", upload.single("foto"), Notebook.upload)
        this.routes.get("/chamados", Notebook.chamados)
    }


}

export default new NotebookRoute().routes;