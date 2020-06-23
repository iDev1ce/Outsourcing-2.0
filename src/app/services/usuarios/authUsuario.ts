import { getCustomRepository } from "typeorm"
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import Usuario from "../../models/Usuario";
import UsuarioRepository from "../../repositories/UsuarioRepository";
import authConfigUsuario from "../../../config/authUsuario";

interface Request {
    email: string
    senha: string
}

interface Response {
    usuario: Usuario
    token: string
}

class AuthUsuario {
    public async execute({ email, senha }: Request): Promise<Response | null> {
        const usuarioRepository = getCustomRepository(UsuarioRepository)

        const existingUsuario = await usuarioRepository.findOne({
            where: { email }
        })

        if(!existingUsuario)
            return null

        if(!await compare(senha, existingUsuario.senha))
            return null

        const { secret, expiresIn } = authConfigUsuario

        const token = sign({}, secret, {
            subject: existingUsuario.id,
            expiresIn: expiresIn
        })

        const usuario = existingUsuario

        delete usuario.senha
        delete usuario.email

        return {
            usuario,
            token
        }
    }
}

export default new AuthUsuario()