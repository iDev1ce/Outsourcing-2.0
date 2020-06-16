import { Router } from "express";

import ImpressoraRoute from "./ImpressoraRoute";

class Routes {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPrivateRoutes();
    }

    private getPrivateRoutes():void {
        this.routes.use("/api/impressoras", ImpressoraRoute);
    }
}

export default new Routes().routes;