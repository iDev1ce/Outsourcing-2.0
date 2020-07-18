import { Router } from "express"

import funcionarioResource from "@app/resources/funcionarioResource"
import EmpresaFuncionarioResource from "@app/resources/empresaFuncionarioResource"
import middleEmpresa from "@middlewares/empresaFuncoinarioAuth"

class EmpresaFuncionarioRoutes {
    public routes: Router

    constructor() {
        this.routes = Router()

        this.getPublicRoutes()
    }

    private getPublicRoutes(): void {
        this.routes.post("/sign-in", EmpresaFuncionarioResource.signIn)
        this.routes.post("/login", EmpresaFuncionarioResource.login)
    }
    
}

export default new EmpresaFuncionarioRoutes().routes
