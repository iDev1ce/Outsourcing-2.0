import { Router } from "express";
import multer from "multer";

import Impressora from "@app/resources/estoque/ImpressoraResource"
import middleFunc from "@middlewares/funcionarioAuth"
import uploadConfig from "@config/upload";

const upload = multer(uploadConfig)

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
        this.routes.patch('/upload/:id', upload.single("foto"), Impressora.upload)
        this.routes.delete("/:id", Impressora.delete)
        this.routes.get("/chamados/:id", Impressora.chamado)
    }
}

export default new ImpressoraRoute().routes;