import { getCustomRepository } from "typeorm";

import Usuario from "../../models/Usuario";
import UsuarioRepository from "../../repositories/UsuarioRepository";
import AppError from "../../../errors/AppError";

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

        if (!await usuarioRepository.save(usuario))
            throw new AppError("Erro ao salvar o usuário")

        return usuario
    }
}

export default new CreateUsuarios()