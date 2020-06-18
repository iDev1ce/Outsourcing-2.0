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
        try {
            const usuarioRepository = getCustomRepository(UsuarioRepository)

            const usuario = usuarioRepository.create({ nome, cpf, email, senha })

            await usuarioRepository.save(usuario)

            return usuario
        } catch (err) {
            throw new AppError("Erro ao registrar usuário", 400)
        }
    }
}

export default new CreateUsuarios()