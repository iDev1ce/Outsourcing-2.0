import { getCustomRepository } from "typeorm";
import { hash } from "bcrypt"

import Usuario from "@app/models/Usuario";
import UsuarioRepository from "@app/repositories/UsuarioRepository";

interface Request {
    nome: string
    cpf: string
    email: string
    senha: string
}

class CreateUsuarios {
    public async execute({ nome, cpf, email, senha }: Request): Promise<Usuario | null | string> {
        const usuarioRepository = getCustomRepository(UsuarioRepository)

        const senhaHash = await hash(senha, 10)

        const checkUserCpf = await usuarioRepository.findOne({
            where: {
                cpf: cpf
            }
        })

        if (checkUserCpf)
            return 'cpf'
        
        const checkUserEmail = await usuarioRepository.findOne({
            where: {
                email: email
            }
        })

        if (checkUserEmail)
            return 'email'

        const usuario = usuarioRepository.create({ 
            nome, 
            cpf, 
            email, 
            senha: senhaHash 
        })

        if (!await usuarioRepository.save(usuario)) 
            return null

        delete usuario.senha

        return usuario
    }
}

export default new CreateUsuarios()