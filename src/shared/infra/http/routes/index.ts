import { Router } from "express"

import ImpressoraRoute from "./estoque/ImpressoraRoute";
import NotebookRoute from "./estoque/NotebookRoute"
import ComputadorRoute from "./estoque/ComputadorRoute"
import FuncionarioRoute from "./FuncionarioRoutes";
import UsersRoute from "./UsuarioRoute";

class Routes {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes():void {
        this.routes.use("/api/impressoras", ImpressoraRoute)
        this.routes.use("/api/funcionarios", FuncionarioRoute)
        this.routes.use("/api/usuarios", UsersRoute)
        this.routes.use("/api/notebooks", NotebookRoute)
        this.routes.use("/api/computadores", ComputadorRoute)
    }
}

export default new Routes().routes