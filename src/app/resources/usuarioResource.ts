import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import createUsuarios from "@app/services/usuarios/createUsuarios"
import authUsuario from "@app/services/usuarios/authUsuario"
import ContratoRepository from "@app/repositories/ContratoRepository"
import ChamadoRepository from "@app/repositories/ChamadoRepository"

class UsuarioResource {
    public async singIn(req: Request, res: Response) {
        const { nome, cpf, email, senha } = req.body

        const usuario = await createUsuarios.execute({ nome, cpf, email, senha })

        if(!usuario)
            return res.status(400).send({ message: "Erro ao salvar usuário" })

        return res.status(201).send(usuario)
    }

    public async login(req: Request, res: Response) {
        const { email, senha } = req.body

        const usuario = await authUsuario.execute({ email, senha })

        if(usuario == null)
            return res.status(400).send({ message: "Erro email/senha inválido" })

        return res.status(200).send(usuario)
    }

    public async getAllChamados(req:Request, res:Response) {
        const contratoRepository = getCustomRepository(ContratoRepository)
        const chamadoRespository = getCustomRepository(ChamadoRepository)

        const contrato = await contratoRepository.find({
            relations: ["cliente", "chamados"],
            where: { id_cliente: req.user.id }
        })

        if(!contrato)
            return res.status(404).send("Não há chamados")

        return res.status(200).send(contrato)
    }
}

export default new UsuarioResource()