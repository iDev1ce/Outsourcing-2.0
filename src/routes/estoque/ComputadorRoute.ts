import { Router } from "express";
import multer from "multer"

import Computador from "@app/resources/estoque/ComputadorResource"
import middleUser from "@middlewares/usuarioAuth"
import middleFunc from "@middlewares/funcionarioAuth"
import uploadConfig from "@config/upload"

const upload = multer(uploadConfig)

class ComputadorResource {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPrivateRoutes();
    }

    private getPrivateRoutes():void {
        // this.routes.use(middleUser)
        
        this.routes.use(middleFunc)

        this.routes.get("/" || "", Computador.getAll)
        this.routes.get("/:id", Computador.getById)
        this.routes.post("/" || "", Computador.insert)
        this.routes.put("/:id", Computador.update)
        this.routes.patch("/foto/:id", upload.single("foto"), Computador.upload)
        this.routes.delete("/:id", Computador.delete)
        this.routes.post("/contrato", Computador.contrato)
        this.routes.get("/chamados/:id", Computador.chamado)
    }
}

export default new ComputadorResource().routes;