import { Request, Response } from "express"

import createUsuarios from "../services/usuarios/createUsuarios"
import authUsuario from "../services/usuarios/authUsuario"

class UsuarioRepository {
    public async singIn(req: Request, res: Response) {
        const { nome, cpf, email, senha } = req.body

        const usuario = await createUsuarios.execute({ nome, cpf, email, senha })

        return res.status(201).send(usuario)
    }

    public async login(req: Request, res: Response) {
        const { email, senha } = req.body

        try {
            const usuario = await authUsuario.execute({ email, senha })

            return res.status(200).send(usuario)
        } catch(err) {
            return res.status(404).send({ erro: err })
        }
    }
}

export default new UsuarioRepository()