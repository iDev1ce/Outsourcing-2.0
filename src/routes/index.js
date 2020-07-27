"use strict";
exports.__esModule = true;
var express_1 = require("express");
var EmpresaFuncionarioRoutes_1 = require("./empresas/funcionario/EmpresaFuncionarioRoutes");
var EmpresaFuncionarioPublicRoutes_1 = require("./empresas/funcionario/EmpresaFuncionarioPublicRoutes");
var UsuarioPublicRoutes_1 = require("./usuarios/UsuarioPublicRoutes");
var UsuarioRoute_1 = require("./usuarios/UsuarioRoute");
var FuncionarioRoutes_1 = require("./funcionarios/FuncionarioRoutes");
var FuncionarioPublicRoutes_1 = require("./funcionarios/FuncionarioPublicRoutes");
var Routes = /** @class */ (function () {
    function Routes() {
        this.routes = express_1.Router();
        this.getFuncionarioRoutes();
        this.getUsuarioRoutes();
        this.getEmpresaRoutes();
    }
    Routes.prototype.getFuncionarioRoutes = function () {
        // Privadas
        this.routes.use("/api", FuncionarioRoutes_1["default"]);
        // Publica
        this.routes.use("/funcionarios", FuncionarioPublicRoutes_1["default"]);
    };
    Routes.prototype.getUsuarioRoutes = function () {
        // Privada
        this.routes.use("/usuarios", UsuarioRoute_1["default"]);
        // Publica
        this.routes.use("", UsuarioPublicRoutes_1["default"]);
    };
    Routes.prototype.getEmpresaRoutes = function () {
        // Privada
        this.routes.use("/api/empresas", EmpresaFuncionarioRoutes_1["default"]);
        // Publica
        this.routes.use("/empresas", EmpresaFuncionarioPublicRoutes_1["default"]);
    };
    return Routes;
}());
exports["default"] = new Routes().routes;
