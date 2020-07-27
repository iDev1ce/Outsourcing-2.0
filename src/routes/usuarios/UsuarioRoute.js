"use strict";
exports.__esModule = true;
var express_1 = require("express");
var usuarioResource_1 = require("@app/resources/usuarioResource");
var usuarioAuth_1 = require("@middlewares/usuarioAuth");
var ImpressoraUsuarioRoute_1 = require("@routes/estoque/Usuario/ImpressoraUsuarioRoute");
var NotebookUsuarioRoute_1 = require("@routes/estoque/Usuario/NotebookUsuarioRoute");
var ComputadorUsuarioRoute_1 = require("@routes/estoque/Usuario/ComputadorUsuarioRoute");
var ContratoRoutes_1 = require("@routes/ContratoRoutes");
var EmpresaClienteRoutes_1 = require("@routes/empresas/usuario/EmpresaClienteRoutes");
var UsersRoute = /** @class */ (function () {
    function UsersRoute() {
        this.routes = express_1.Router();
        this.getPublicRoutes();
    }
    UsersRoute.prototype.getPublicRoutes = function () {
        this.routes.use("/impressoras", ImpressoraUsuarioRoute_1["default"]);
        this.routes.use("/notebooks", NotebookUsuarioRoute_1["default"]);
        this.routes.use("/computadores", ComputadorUsuarioRoute_1["default"]);
        this.routes.get("/chamados", usuarioAuth_1["default"], usuarioResource_1["default"].getAllChamados);
        this.routes.use("/contratos", usuarioAuth_1["default"], ContratoRoutes_1["default"]);
        this.routes.use("/empresas", usuarioAuth_1["default"], EmpresaClienteRoutes_1["default"]);
    };
    return UsersRoute;
}());
exports["default"] = new UsersRoute().routes;
