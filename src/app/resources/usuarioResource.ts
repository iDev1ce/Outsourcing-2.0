import { Request, Response } from "express"

import createUsuarios from "@app/services/usuarios/createUsuarios"
import authUsuario from "@app/services/usuarios/authUsuario"

class UsuarioRepository {
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
}

export default new UsuarioRepository()