import { Router } from "express"

import ImpressoraFuncionarioRoute from "./estoque/Funcionarios/ImpressoraFuncionarioRoute"
import NotebookFuncionarioRoute from "./estoque/Funcionarios/NotebookFuncionarioRoute"
import ComputadorFuncionarioRoute from "./estoque/Funcionarios/ComputadorFuncionarioRoute"

import ImpressoraUsuarioRoute from "./estoque/Usuario/ImpressoraUsuarioRoute"
import NotebookUsuarioRoute from "./estoque/Usuario/NotebookUsuarioRoute"
import ComputadorUsuarioRoute from "./estoque/Usuario/ComputadorUsuarioRoute"

import FuncionarioRoute from "./FuncionarioRoutes"
import UsersRoute from "./UsuarioRoute"

class Routes {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getFuncionarioPrivateRoutes()
        this.getUsuarioPrivateRoutes()
    }

    private getFuncionarioPrivateRoutes():void {
        this.routes.use("/api/impressoras", ImpressoraFuncionarioRoute)
        this.routes.use("/api/funcionarios", FuncionarioRoute)
        this.routes.use("/api/notebooks", NotebookFuncionarioRoute)
        this.routes.use("/api/computadores", ComputadorFuncionarioRoute)
    }

    private getUsuarioPrivateRoutes():void {
        this.routes.use("/impressoras", ImpressoraUsuarioRoute)
        this.routes.use("/usuarios", UsersRoute)
        this.routes.use("/notebooks", NotebookUsuarioRoute)
        this.routes.use("/computadores", ComputadorUsuarioRoute)
    }
}

export default new Routes().routes