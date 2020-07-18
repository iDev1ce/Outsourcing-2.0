import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { compare } from "bcrypt"
import { sign } from "jsonwebtoken"

import createEmpresaFuncionario from "@app/services/empresas/empresa_funcionario/createEmpresaFuncionario"
import EmpresaFuncionarioRepository from "@app/repositories/empresas/EmpresaFuncionarioRepository"
import authEmpresaConfig from "@config/authEmpresa"

class EmpresaFuncionarioResource {
    public async signIn(req: Request, res: Response) {
        const {
            nome,
            email,
            senha,
            cnpj,
            estado,
            cidade,
            bairro,
            rua,
            numero,
            cep,
            telefone,
            emailComercial
        } = req.body

        const empresaFuncionario = await createEmpresaFuncionario.execute({
            nome,
            email,
            senha,
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

        if(empresaFuncionario === "email")
            return res.status(400).send({ message: "E-mail já está em uso." })

        if(empresaFuncionario === "cnpj")
            return res.status(400).send({ message: "CNPJ já está em uso." })

        if(empresaFuncionario === "comercial")
            return res.status(400).send({ message: "E-mail comercial já está em uso." })

        if(!empresaFuncionario)
            return res.status(400).send({ message: "Erro ao cadastrar empresa!" })

        return res.status(201).send(empresaFuncionario)
    }

    public async login(req: Request, res: Response) {
        const { email, senha } = req.body

        const empresaFuncionarioRepository = getCustomRepository(EmpresaFuncionarioRepository)

        const empresaFuncionario = await empresaFuncionarioRepository.findOne({
            where: { email }
        })

        if(!empresaFuncionario)
            return res.status(400).send({ message: "E-mail ou senha inválido" })

        if(!await compare(senha, empresaFuncionario.senha))
            return res.status(400).send({ message: "E-mail ou senha inválido" })

        const { secret, expiresIn } = authEmpresaConfig

        const token = sign({}, secret, {
            subject: empresaFuncionario.id,
            expiresIn: expiresIn
        })

        const empresa = empresaFuncionario

        return res.status(200).send({
            empresa,
            token
        })
    }
}

export default new EmpresaFuncionarioResource()
