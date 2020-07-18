import EmpresaCliente from "@app/models/empresas/EmpresaCliente"
import { getCustomRepository } from "typeorm"

import EmpresaClienteRepository from "@app/repositories/empresas/EmpresaClienteRepository"
import UsuarioRepository from "@app/repositories/UsuarioRepository"
import ICreateEmpresa from "@app/dto/usuario/ICreateEmpresa"

class CreateEmpresaCliente {
    public async execute(
        { nome, email, telefone, cep, numero, cidade, estado, rua, bairro, cnpj, id_usuario }: ICreateEmpresa
    ): Promise<EmpresaCliente | string | null> {
        const empresaClienteRepository = getCustomRepository(EmpresaClienteRepository)
        const usuarioRepository = getCustomRepository(UsuarioRepository)

        const empresaExisting = await empresaClienteRepository.findOne({
            where: { cnpj }
        })

        if(empresaExisting)
            return "cnpj"

        const empresaCliente = empresaClienteRepository.create({
            nome,
            email,
            telefone,
            cep,
            numero,
            cidade,
            estado,
            rua,
            bairro,
            cnpj
        })

        await empresaClienteRepository.save(empresaCliente)

        const getUsuario = await usuarioRepository.findOne({
            where: { id: id_usuario }
        })

        if(!getUsuario)
            return null

        getUsuario.id_empresa = empresaCliente.id

        const usuario = usuarioRepository.create(getUsuario)

        await usuarioRepository.save(usuario)

        delete empresaCliente.cnpj

        return empresaCliente
    }
}

export default new CreateEmpresaCliente()
