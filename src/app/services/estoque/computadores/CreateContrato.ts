import { getCustomRepository } from "typeorm"

import ContratoRepository from "@app/repositories/ContratoRepository"
import ComputadorRepository from "@app/repositories/estoque/computador/ComputadorRepository";
import UsuarioRepository from "@app/repositories/UsuarioRepository";

import ICreateContratoResquest from "@app/dto/computador/ICreateContratoRequest"
import ICreateContratoResponse from "@app/dto/computador/ICreateContratoResponse"

class CreateContrato {
    public async execute(
        { id_computador, id_cliente }:ICreateContratoResquest
    ): Promise<ICreateContratoResponse | null> {
        const contratoRepository = getCustomRepository(ContratoRepository)
        const computadorRepository = getCustomRepository(ComputadorRepository)
        const usuarioRepository = getCustomRepository(UsuarioRepository)

        const computador = await computadorRepository.findOne({
            where: { id: id_computador }
        })

        if (!computador)
            return null
        
        const contrato = contratoRepository.create({
            id_cliente,
            id_funcionario: computador.id_funcionario
        })
        
        await contratoRepository.save(contrato)
        
        computador.contrato_id = contrato.id

        const computadorSave = computadorRepository.create(computador)
        await computadorRepository.save(computadorSave)

        const usuario = await usuarioRepository.find({
            relations: ["empresa"],
            where: { id: contrato.id_cliente }
        })

        console.log(usuario)

        return { contrato, usuario }
    }
}

export default new CreateContrato()