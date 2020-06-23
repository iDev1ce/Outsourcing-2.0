import { getCustomRepository } from "typeorm"
import { hash } from "bcrypt"

import FuncionarioRepository from "../../repositories/FuncionarioRepository"
import Funcionario from "../../models/Funcionarios"

interface Request {
    cpf: string
    nome: string
    email: string
    senha: string
}

class CreateFuncionario {
    public async execute({ cpf, nome, email, senha }: Request): Promise<Funcionario | null> {
        const funcionarioRepository = getCustomRepository(FuncionarioRepository)

        const senhaHash = await hash(senha, 10)

        const funcionario = funcionarioRepository.create({
            cpf,
            nome,
            email, 
            senha: senhaHash 
        })

        if (!await funcionarioRepository.save(funcionario))
            return null

        delete funcionario.senha
        delete funcionario.email

        return funcionario
    }
}

export default new CreateFuncionario()