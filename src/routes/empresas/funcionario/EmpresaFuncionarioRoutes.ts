import { Router } from "express"

import funcionarioResource from "@app/resources/funcionarioResource"
import middleEmpresa from "@middlewares/empresaFuncoinarioAuth"

class EmpresaFuncionarioRoutes {
    public routes: Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes() :void {
        this.routes.post("/registrar", middleEmpresa, funcionarioResource.singIn)
    }
    
}

export default new EmpresaFuncionarioRoutes().routes
