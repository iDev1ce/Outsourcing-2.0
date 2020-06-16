import { Router } from "express"

class UsersRoute {
    public routes:Router

    constructor() {
        this.routes = Router();
    }

    public getPublicRoutes():void {
        this.routes.use("/users", )
    }
}

export default new UsersRoute().routes;