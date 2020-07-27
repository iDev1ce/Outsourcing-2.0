"use strict";
exports.__esModule = true;
var express_1 = require("express");
var usuarioResource_1 = require("@app/resources/usuarioResource");
var UsersRoute = /** @class */ (function () {
    function UsersRoute() {
        this.routes = express_1.Router();
        this.getPublicRoutes();
    }
    UsersRoute.prototype.getPublicRoutes = function () {
        this.routes.post("/sign-in", usuarioResource_1["default"].singIn);
        this.routes.post("/login", usuarioResource_1["default"].login);
    };
    return UsersRoute;
}());
exports["default"] = new UsersRoute().routes;
