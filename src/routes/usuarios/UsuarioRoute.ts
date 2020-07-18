import { Router } from "express"

import usuarioResource from "@app/resources/usuarioResource"
import middleUser from "@middlewares/usuarioAuth"
import ImpressoraUsuarioRoute from "@routes/estoque/Usuario/ImpressoraUsuarioRoute";
import NotebookUsuarioRoute from "@routes/estoque/Usuario/NotebookUsuarioRoute";
import ComputadorUsuarioRoute from "@routes/estoque/Usuario/ComputadorUsuarioRoute";
import ContratoRoutes from "@routes/ContratoRoutes";
import EmpresaClienteRoutes from "@routes/empresas/usuario/EmpresaClienteRoutes";

class UsersRoute {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPublicRoutes()
    }

    public getPublicRoutes():void {
        this.routes.use("/impressoras", ImpressoraUsuarioRoute)
        this.routes.use("/notebooks", NotebookUsuarioRoute)
        this.routes.use("/computadores", ComputadorUsuarioRoute)
        this.routes.get("/chamados", middleUser, usuarioResource.getAllChamados)
        this.routes.use("/contratos", middleUser, ContratoRoutes)
        this.routes.use("/empresas", middleUser, EmpresaClienteRoutes)
    }
}

export default new UsersRoute().routes