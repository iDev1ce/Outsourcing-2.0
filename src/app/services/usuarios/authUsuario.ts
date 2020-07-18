import { getCustomRepository } from "typeorm"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import UsuarioRepository from "@app/repositories/UsuarioRepository"
import authConfigUsuario from "@config/authUsuario"
import IAuthRequest from "@app/dto/usuario/IAuthRequest"
import IAuthResponse from "@app/dto/usuario/IAuthResponse"

class AuthUsuario {
    public async execute({ email, senha }: IAuthRequest): Promise<IAuthResponse | null> {
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

        delete existingUsuario.senha
        delete existingUsuario.email

        const usuario = existingUsuario

        return {
            usuario,
            token
        }
    }
}

export default new AuthUsuario()