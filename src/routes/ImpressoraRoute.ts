import { Router } from "express";

import Impressora from "../app/resources/ImpressoraResource";

class ImpressoraRoute {
    public routes:Router

    constructor() {
        this.routes = Router();

        this.getPrivateRoutes();
    }

    private getPrivateRoutes():void {
        this.routes.get("/", Impressora.getAll);
        this.routes.post("/", Impressora.insert)
    }


}

export default new ImpressoraRoute().routes;