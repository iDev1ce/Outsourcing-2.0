import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"

import createUsuarios from "@app/services/usuarios/createUsuarios"
import authUsuario from "@app/services/usuarios/authUsuario"
import ContratoRepository from "@app/repositories/ContratoRepository"
import ChamadoRepository from "@app/repositories/ChamadoRepository"
import createEmpresaCliente from "@app/services/usuarios/createEmpresaCliente"
import UsuarioRepository from "@app/repositories/UsuarioRepository"

class UsuarioResource {
    public async singIn(req: Request, res: Response) {
        const { nome, cpf, email, senha } = req.body

        const usuario = await createUsuarios.execute({ nome, cpf, email, senha })

        if (usuario == 'cpf')
            return res.status(400).send({message: "CPF já em uso"})
            
        if (usuario == 'email')
            return res.status(400).send({message: "Email já em uso"})

        if(!usuario)
            return res.status(400).send({ message: "Erro ao salvar usuário" })

        return res.status(201).send(usuario)
    }

    public async login(req: Request, res: Response) {
        const { email, senha } = req.body

        const usuario = await authUsuario.execute({ email, senha })

        if(usuario == null)
            return res.status(400).send({ message: "Erro email/senha inválido" })

        return res.status(200).send(usuario)
    }

    public async getAllChamados(req:Request, res:Response) {
        const chamadoRepository = getCustomRepository(ChamadoRepository)
        const usuarioRepository = getCustomRepository(UsuarioRepository)

        const chamados = await chamadoRepository.find({
            select: ["id", "id_cliente", "id_contrato", "descricao"],
            relations: ["computador", "impressora", "notebook"],
            where: { id_cliente: req.user.id }
        })

        const usuario = await usuarioRepository.findOne({
            relations: ["empresa"],
            where: { id: chamados[0].id_cliente }
        })

        if(!usuario)
            return null

        delete usuario.cpf
        delete usuario.senha


        if(!chamados)
            return res.status(404).send("Não há chamados")

        return res.status(200).send({ chamados, usuario })
    }

    public async getByIdChamados(req:Request, res:Response) {
        const chamadoRepository = getCustomRepository(ChamadoRepository)
        const usuarioRepository = getCustomRepository(UsuarioRepository)

        const { id } = req.params

        const chamados = await chamadoRepository.find({
            select: ["id", "id_cliente", "id_contrato", "descricao"],
            relations: ["computador", "impressora", "notebook"],
            where: { id_cliente: req.user.id , id: id }
        })


        const usuario = await usuarioRepository.findOne({
            relations: ["empresa"],
            where: { id: chamados[0].id_cliente }
        })

        if(!usuario)
            return null

        delete usuario.cpf
        delete usuario.senha


        if(!chamados)
            return res.status(404).send("Não há chamados")

        return res.status(200).send({ chamados, usuario })
    }

    public async registerEmpresaCliente(req: Request, res: Response) {
        const {
            nome,
            estado,
            cidade,
            bairro,
            rua,
            cep,
            numero,
            email,
            telefone,
            cnpj
        } = req.body

        const empresaCliente = await createEmpresaCliente.execute({
            nome,
            estado,
            cidade,
            bairro,
            rua,
            cep,
            numero,
            email,
            telefone,
            cnpj,
            id_usuario: req.user.id
        })

        if(empresaCliente === "cnpj")
            return res.status(400).send({ message: 'Empresa já cadastrada' })

        if(!empresaCliente)
            return res.status(400).send({ message: 'Ops algo deu errado!' })

        return res.status(201).send(empresaCliente)
    }

    public async getAllContratos(req:Request, res:Response) {
        const contratoRepository = getCustomRepository(ContratoRepository)

        const contrato = await contratoRepository.find({
            where: { id_cliente: req.user.id }
        })

        if (contrato.length == 0)
            return res.status(404).send({ message: "Não há contratos" })

        return res.status(200).send(contrato)
    }
}

export default new UsuarioResource()