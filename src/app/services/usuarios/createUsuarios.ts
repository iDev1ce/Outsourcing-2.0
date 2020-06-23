import { getCustomRepository } from "typeorm";
import { hash } from "bcrypt"

import Usuario from "../../models/Usuario";
import UsuarioRepository from "../../repositories/UsuarioRepository";

interface Request {
    nome: string
    cpf: string
    email: string
    senha: string
}

class CreateUsuarios {
    public async execute({ nome, cpf, email, senha }: Request): Promise<Usuario | null> {
        const usuarioRepository = getCustomRepository(UsuarioRepository)

        const senhaHash = await hash(senha, 10)

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