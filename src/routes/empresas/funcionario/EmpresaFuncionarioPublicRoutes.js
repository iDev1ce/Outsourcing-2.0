"use strict";
exports.__esModule = true;
var express_1 = require("express");
var empresaFuncionarioResource_1 = require("@app/resources/empresaFuncionarioResource");
var EmpresaFuncionarioRoutes = /** @class */ (function () {
    function EmpresaFuncionarioRoutes() {
        this.routes = express_1.Router();
        this.getPublicRoutes();
    }
    EmpresaFuncionarioRoutes.prototype.getPublicRoutes = function () {
        this.routes.post("/sign-in", empresaFuncionarioResource_1["default"].signIn);
        this.routes.post("/login", empresaFuncionarioResource_1["default"].login);
    };
    return EmpresaFuncionarioRoutes;
}());
exports["default"] = new EmpresaFuncionarioRoutes().routes;
