import { Router } from "express"

import ImpressoraFuncionarioRoute from "./estoque/ImpressoraFuncionarioRoute"
import NotebookFuncionarioRoute from "./estoque/NotebookFuncionarioRoute"
import ComputadorFuncionarioRoute from "./estoque/ComputadorFuncionarioRoute"

import ImpressoraUsuarioRoute from "./estoque/ImpressoraUsuarioRoute"
import NotebookUsuarioRoute from "./estoque/NotebookUsuarioRoute"
import ComputadorUsuarioRoute from "./estoque/ComputadorUsuarioRoute"

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