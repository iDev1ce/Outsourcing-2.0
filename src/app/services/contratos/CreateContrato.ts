import { getCustomRepository } from "typeorm"

import ContratoRepository from "@app/repositories/ContratoRepository"
import ComputadorRepository from "@app/repositories/estoque/computador/ComputadorRepository"
import ImpressoraRepository from "@app/repositories/estoque/impressora/ImpressoraRepository"
import NotebookRepository from "@app/repositories/estoque/notebook/NotebookRepository"
import ICreateRequest from "@app/dto/contrato/ICreateRequest"
import ICreateResponse from "@app/dto/contrato/ICreateResponse"

class CreateContrato {

    public async execute({ id_maquinas, id_cliente, valor }: ICreateRequest): Promise<ICreateResponse | null> {
        const contratoRepository = getCustomRepository(ContratoRepository)
        const computadorRepository = getCustomRepository(ComputadorRepository)
        const impressoraRepository = getCustomRepository(ImpressoraRepository)
        const notebookRepository = getCustomRepository(NotebookRepository)

        let contrato = contratoRepository.create({
            id_cliente,
            valor: valor
        })

        const total = valor

        await contratoRepository.save(contrato)

        for(let i = 0; i <= id_maquinas.length; i++) {
            let contratoData
            
            const computador = await computadorRepository.findOne({
                where: { id: id_maquinas[i] }
            })

            const notebook = await notebookRepository.findOne({
                where: { id: id_maquinas[i] }
            })

            const impressora = await impressoraRepository.findOne({
                where: { id: id_maquinas[i] }
            })

            if(computador) {
                computador.contrato_id = contrato.id
                computador.id_cliente = id_cliente

                const contratoCompurador = computadorRepository.create(computador)

                contratoData = [contratoCompurador]

                await computadorRepository.save(contratoCompurador)
            } else if(notebook) {
                notebook.id_contrato = contrato.id
                notebook.id_cliente = id_cliente

                const contratoNotebook = notebookRepository.create(notebook)

                contratoData = [contratoNotebook]

                await notebookRepository.save(contratoNotebook)
            } else if(impressora) {
                impressora.id_contrato = contrato.id
                impressora.id_cliente = id_cliente
                
                const contratoImpressora = impressoraRepository.create(impressora)

                contratoData = [contratoImpressora]

                await impressoraRepository.save(contratoImpressora)
            }

            if(computador) {
                contrato = contratoRepository.create({
                    id: contrato.id,
                    id_cliente,
                    id_funcionario: computador.id_funcionario,
                })
                
                await contratoRepository.save(contrato)
            } else if(notebook) {
                contrato = contratoRepository.create({
                    id: contrato.id,
                    id_cliente,
                    id_funcionario: notebook.id_funcionario
                })
        
                await contratoRepository.save(contrato)
            } else if(impressora) {
                contrato = contratoRepository.create({
                    id: contrato.id,
                    id_cliente,
                    id_funcionario: impressora.id_funcionario
                })
        
                await contratoRepository.save(contrato)
            }
        }

        return { contrato, total }
    }
}

export default new CreateContrato()
