import { Router } from "express"

import ImpressoraRoute from "./estoque/ImpressoraRoute"
import NotebookRoute from "./estoque/NotebookRoute"
import ComputadorRoute from "./estoque/ComputadorRoute"

class Routes {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes():void {
        this.routes.use("/api/impressoras", ImpressoraRoute)
        this.routes.use("/api/notebooks", NotebookRoute)
        this.routes.use("/api/computadores", ComputadorRoute)
    }
}

export default new Routes().routes