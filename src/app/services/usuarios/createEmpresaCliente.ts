import EmpresaCliente from "@app/models/empresas/EmpresaCliente";
import { getCustomRepository } from "typeorm";
import EmpresaClienteRepository from "@app/repositories/empresas/EmpresaClienteRepository";
import UsuarioRepository from "@app/repositories/UsuarioRepository";

interface Request {
    nome: string,
    email: string
    telefone: string,
    cep: string,
    numero: string,
    cidade: string,
    estado: string,
    rua: string
    bairro: string
    cnpj: string
    id_usuario: string
}

class CreateEmpresaCliente {
    public async execute(
        { nome, email, telefone, cep, numero, cidade, estado, rua, bairro, cnpj, id_usuario }: Request
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
