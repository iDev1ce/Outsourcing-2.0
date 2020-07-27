"use strict";
exports.__esModule = true;
var express_1 = require("express");
var funcionarioResource_1 = require("@app/resources/funcionarioResource");
var FuncionarioPublicRoutes = /** @class */ (function () {
    function FuncionarioPublicRoutes() {
        this.routes = express_1.Router();
        this.getPrivateRoutes();
    }
    FuncionarioPublicRoutes.prototype.getPrivateRoutes = function () {
        this.routes.post("/auth", funcionarioResource_1["default"].login);
    };
    return FuncionarioPublicRoutes;
}());
exports["default"] = new FuncionarioPublicRoutes().routes;
