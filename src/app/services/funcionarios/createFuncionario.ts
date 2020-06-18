import { getCustomRepository } from "typeorm"
import { hash } from "bcrypt"

import FuncionarioRepository from "../../repositories/FuncionarioRepository"
import Funcionario from "../../models/Funcionarios"
import AppError from "../../../errors/AppError"

interface Request {
    cpf: string
    nome: string
    email: string
    senha: string
}

class CreateFuncionario {
    public async execute({ cpf, nome, email, senha }: Request): Promise<Funcionario | null> {
        try {
            const funcionarioRepository = getCustomRepository(FuncionarioRepository)
    
            const senhaHash = await hash(senha, 10)
    
            const funcionario = funcionarioRepository.create({
                cpf,
                nome,
                email, 
                senha: senhaHash 
            })
    
            await funcionarioRepository.save(funcionario)
    
            delete funcionario.senha
            delete funcionario.email
    
            return funcionario
        } catch (err) {
            throw new AppError("Erro ao registrar funcionário")
        }
    }
}

export default new CreateFuncionario()