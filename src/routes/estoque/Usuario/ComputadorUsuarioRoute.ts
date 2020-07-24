import { Router } from "express";
import multer from "multer"

import Computador from "@app/resources/estoque/ComputadorResource"
import middleUser from "@middlewares/usuarioAuth"

class ComputadorResource {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPrivateRoutes()
    }
    
    private getPrivateRoutes():void {
        this.routes.use(middleUser)
        this.routes.get("/" || "", Computador.getAllCliente)
        this.routes.get("/minhas-maquinas" || "", Computador.getMyMachines)
        this.routes.get("/all" || "", Computador.get)
        this.routes.get("/:id", Computador.getById)
        this.routes.post("/contrato", Computador.contrato)
        this.routes.post("/chamados", Computador.chamado)
        this.routes.get("/chamados/:id_maquina", Computador.getAllChamados)
    }
}

export default new ComputadorResource().routes;