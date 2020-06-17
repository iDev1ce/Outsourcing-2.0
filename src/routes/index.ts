import { Router } from "express";

import ImpressoraRoute from "./ImpressoraRoute";
import FuncionarioRoute from "./funcionariosRoutes";
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
    }
}

export default new Routes().routes;