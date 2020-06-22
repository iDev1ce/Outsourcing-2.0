import { Router } from "express"

import usuarioResource from "../app/resources/usuarioResource";

class UsersRoute {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPublicRoutes()
    }

    public getPublicRoutes():void {
        this.routes.post("/sign-in", usuarioResource.singIn)
        this.routes.post("/login", usuarioResource.login)
    }
}

export default new UsersRoute().routes