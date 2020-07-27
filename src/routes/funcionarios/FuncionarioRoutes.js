"use strict";
exports.__esModule = true;
var express_1 = require("express");
var funcionarioResource_1 = require("@app/resources/funcionarioResource");
var funcionarioAuth_1 = require("@middlewares/funcionarioAuth");
var ImpressoraFuncionarioRoute_1 = require("@routes/estoque/Funcionarios/ImpressoraFuncionarioRoute");
var NotebookFuncionarioRoute_1 = require("@routes/estoque/Funcionarios/NotebookFuncionarioRoute");
var ComputadorFuncionarioRoute_1 = require("@routes/estoque/Funcionarios/ComputadorFuncionarioRoute");
var FuncionarioRoutes = /** @class */ (function () {
    function FuncionarioRoutes() {
        this.routes = express_1.Router();
        this.getPrivateRoutes();
    }
    FuncionarioRoutes.prototype.getPrivateRoutes = function () {
        this.routes.get("/contratos", funcionarioAuth_1["default"], funcionarioResource_1["default"].getAllContratos);
        this.routes.get("/contratos/:id", funcionarioAuth_1["default"], funcionarioResource_1["default"].getByIdContratos);
        this.routes.get("/chamados/:id", funcionarioAuth_1["default"], funcionarioResource_1["default"].getByIdChamados);
        this.routes.get("/chamados", funcionarioAuth_1["default"], funcionarioResource_1["default"].getAllChamados);
        this.routes.use("/impressoras", ImpressoraFuncionarioRoute_1["default"]);
        this.routes.use("/notebooks", NotebookFuncionarioRoute_1["default"]);
        this.routes.use("/computadores", ComputadorFuncionarioRoute_1["default"]);
    };
    return FuncionarioRoutes;
}());
exports["default"] = new FuncionarioRoutes().routes;
