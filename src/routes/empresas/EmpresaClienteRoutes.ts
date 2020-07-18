import { Router } from "express";

import EmpresaClienteResource from '@app/resources/usuarioResource'

class EmpresaClienteRoutes {
    public routes:Router

    constructor() {
        this.routes = Router()

        this.getPrivateRoutes()
    }

    private getPrivateRoutes():void {
        this.routes.post("/register", EmpresaClienteResource.registerEmpresaCliente)
    }
}

export default new EmpresaClienteRoutes().routes