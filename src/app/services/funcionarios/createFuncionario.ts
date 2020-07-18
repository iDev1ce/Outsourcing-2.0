import { getCustomRepository } from "typeorm"
import { hash } from "bcrypt"

import FuncionarioRepository from "@app/repositories/FuncionarioRepository"
import Funcionario from "@app/models/Funcionarios"
import ICreate from "@app/dto/funcionario/ICreate"

class CreateFuncionario {
    public async execute({ cpf, nome, email, senha, id_empresa }: ICreate): Promise<Funcionario | string | null> {
        const funcionarioRepository = getCustomRepository(FuncionarioRepository)

        const senhaHash = await hash(senha, 10)

        const checkUserCpf = await funcionarioRepository.findOne({
            where: { cpf }
        })

        if(checkUserCpf)
            return "cpf"

        const checkUserEmail = await funcionarioRepository.findOne({
            where: { email }
        })

        if(checkUserEmail)
            return "email"
            
        const funcionario = funcionarioRepository.create({
            nome,
            email,
            senha: senhaHash,
            cpf,
            empresa_id: id_empresa
        })


        if (!await funcionarioRepository.save(funcionario))
            return null

        delete funcionario.senha
        delete funcionario.email

        return funcionario
    }
}

export default new CreateFuncionario()