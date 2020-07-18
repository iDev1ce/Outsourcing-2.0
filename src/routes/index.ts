import { Router } from "express"

import EmpresaFuncionarioRoutes from "./empresas/funcionario/EmpresaFuncionarioRoutes"
import EmpresaFuncionarioPublicRoutes from "./empresas/funcionario/EmpresaFuncionarioPublicRoutes"

import UsuarioPublicRoutes from "./usuarios/UsuarioPublicRoutes"
import UsuarioRoutes from "./usuarios/UsuarioRoute"

import FuncionarioRoute from "./funcionarios/FuncionarioRoutes"
import FuncionarioPublicRoutes from "./funcionarios/FuncionarioPublicRoutes"


class Routes {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getFuncionarioRoutes()
        this.getUsuarioRoutes()
        this.getEmpresaRoutes()
    }
 
    private getFuncionarioRoutes():void {
        
        // Privadas
        this.routes.use("/api", FuncionarioRoute)

        // Publica
        this.routes.use("/funcionarios", FuncionarioPublicRoutes)
    }

    public getUsuarioRoutes(): void {
        
        // Privada
        this.routes.use("/usuarios", UsuarioRoutes)

        // Publica
        this.routes.use("", UsuarioPublicRoutes)
    }

    public getEmpresaRoutes(): void {
        
        // Privada
        this.routes.use("/api/empresas", EmpresaFuncionarioRoutes)

        // Publica
        this.routes.use("/empresas", EmpresaFuncionarioPublicRoutes)
    }
    
}

export default new Routes().routes
