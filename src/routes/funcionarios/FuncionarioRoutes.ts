import { Router } from "express";

import funcionarioResource from "@app/resources/funcionarioResource"
import middle from "@middlewares/funcionarioAuth"
import ImpressoraFuncionarioRoute from "@routes/estoque/Funcionarios/ImpressoraFuncionarioRoute";
import NotebookFuncionarioRoute from "@routes/estoque/Funcionarios/NotebookFuncionarioRoute";
import ComputadorFuncionarioRoute from "@routes/estoque/Funcionarios/ComputadorFuncionarioRoute";

class FuncionarioRoutes {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes():void {
        this.routes.get("/contratos", middle, funcionarioResource.getAllContratos)
        this.routes.get("/contratos/:id", middle, funcionarioResource.getByIdContratos)
        this.routes.get("/chamados/:id", middle, funcionarioResource.getByIdChamados)
        this.routes.get("/chamados", middle, funcionarioResource.getAllChamados)
        this.routes.use("/impressoras", ImpressoraFuncionarioRoute)
        this.routes.use("/notebooks", NotebookFuncionarioRoute)
        this.routes.use("/computadores", ComputadorFuncionarioRoute)
    }
}

export default new FuncionarioRoutes().routes