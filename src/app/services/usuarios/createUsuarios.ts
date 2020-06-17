import { getCustomRepository } from "typeorm";

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

        const usuario = usuarioRepository.create({ nome, cpf, email, senha })

        await usuarioRepository.save(usuario)

        return usuario
    }
}

export default new CreateUsuarios()