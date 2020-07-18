import { Router } from "express"

import funcionarioResource from "@app/resources/funcionarioResource"
import EmpresaFuncionarioResource from "@app/resources/empresaFuncionarioResource"
import middleEmpresa from "@middlewares/empresaFuncoinarioAuth"

class EmpresaFuncionarioRoutes {
    public routes: Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
        this.getPublicRoutes()
    }

    private getPublicRoutes(): void {
        this.routes.post("/sign-in", EmpresaFuncionarioResource.signIn)
        this.routes.post("/login", EmpresaFuncionarioResource.login)
    }

    private getPrivateRoutes() :void {
        this.routes.get("/contratos", middleEmpresa)
        this.routes.get("/chamados", middleEmpresa)
        this.routes.post("/registrar", middleEmpresa, funcionarioResource.singIn)
    }
    
}

export default new EmpresaFuncionarioRoutes().routes
