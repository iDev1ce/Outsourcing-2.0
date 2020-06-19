import { Router } from "express";

import funcionarioResource from "../app/resources/funcionarioResource";

class FuncionariosRoutes {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes():void {
        this.routes.post("/sign-in", funcionarioResource.singIn)
        this.routes.post("/auth", funcionarioResource.login)
    }
}

export default new FuncionariosRoutes().routes