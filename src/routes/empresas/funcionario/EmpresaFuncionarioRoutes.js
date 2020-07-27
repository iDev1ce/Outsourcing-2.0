"use strict";
exports.__esModule = true;
var express_1 = require("express");
var funcionarioResource_1 = require("@app/resources/funcionarioResource");
var empresaFuncoinarioAuth_1 = require("@middlewares/empresaFuncoinarioAuth");
var EmpresaFuncionarioRoutes = /** @class */ (function () {
    function EmpresaFuncionarioRoutes() {
        this.routes = express_1.Router();
        this.getPrivateRoutes();
    }
    EmpresaFuncionarioRoutes.prototype.getPrivateRoutes = function () {
        this.routes.post("/registrar", empresaFuncoinarioAuth_1["default"], funcionarioResource_1["default"].singIn);
    };
    return EmpresaFuncionarioRoutes;
}());
exports["default"] = new EmpresaFuncionarioRoutes().routes;
