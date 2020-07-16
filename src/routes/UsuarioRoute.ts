import { Router } from "express"

import usuarioResource from "@app/resources/usuarioResource"
import middleUser from "@middlewares/usuarioAuth"

class UsersRoute {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPublicRoutes()
    }

    public getPublicRoutes():void {
        this.routes.post("/sign-in", usuarioResource.singIn)
        this.routes.post("/login", usuarioResource.login)
        this.routes.get("/chamados", middleUser, usuarioResource.getAllChamados)
        this.routes.get("/contrato", middleUser, usuarioResource.getAllContratos)
    }
}

export default new UsersRoute().routes