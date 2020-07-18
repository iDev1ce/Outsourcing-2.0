import { getCustomRepository } from "typeorm"
import { hash } from "bcrypt"

import EmpresaFuncionario from "@app/models/empresas/EmpresaFuncionario"
import EmpresaFuncionarioRepository from "@app/repositories/empresas/EmpresaFuncionarioRepository"
import ICreate from "@app/dto/empresa/ICreate"

class CreateEmpresaFuncionario {
    public async execute(
        { nome, email, senha, cnpj, estado, cidade, bairro, rua, numero, cep, telefone, emailComercial }: ICreate
    ): Promise<EmpresaFuncionario | string | null> {
        const empresaFuncionarioRepository = getCustomRepository(EmpresaFuncionarioRepository)

        const emailInUse = await empresaFuncionarioRepository.findOne({
            where: { email }
        })

        if(emailInUse) 
            return "email"

        const cnpjInUse = await empresaFuncionarioRepository.findOne({
            where: { cnpj }
        })

        if(cnpjInUse)
            return "cnpj"

        const emailComercialInUse = await empresaFuncionarioRepository.findOne({
            where: { emailComercial }
        })

        if(emailComercialInUse)
            return "comercial"

        const hashSenha = await hash(senha, 10)

        const empresaFuncionario = empresaFuncionarioRepository.create({
            nome,
            email,
            senha: hashSenha,
            cnpj,
            estado,
            cidade,
            bairro,
            rua,
            numero,
            cep,
            telefone,
            emailComercial
        })

        if(!empresaFuncionario)
            return null

        await empresaFuncionarioRepository.save(empresaFuncionario)

        return empresaFuncionario
    }
}

export default new CreateEmpresaFuncionario()
