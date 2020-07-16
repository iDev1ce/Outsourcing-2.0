import { getCustomRepository } from "typeorm"

import Contrato from "@app/models/Contrato"
import ContratoRepository from "@app/repositories/ContratoRepository"
import ComputadorRepository from "@app/repositories/estoque/ComputadorRepository"
import ImpressoraRepository from "@app/repositories/estoque/ImpressoraRepository"
import NotebookRepository from "@app/repositories/estoque/NotebookRepository"

interface Request {
    id_maquinas: Array<string>
    id_cliente: string
}

class CreateContrato {
    public async execute({ id_maquinas, id_cliente }: Request): Promise<any | null> {
        const contratoRepository = getCustomRepository(ContratoRepository)
        const computadorRepository = getCustomRepository(ComputadorRepository)
        const impressoraRepository = getCustomRepository(ImpressoraRepository)
        const notebookRepository = getCustomRepository(NotebookRepository)

        const data = id_maquinas.forEach(async id => {
            const computador = await computadorRepository.findOne({
                where: { id }
            })

            const notebook = await notebookRepository.findOne({
                where: { id }
            })

            const impressora = await impressoraRepository.findOne({
                where: { id }
            })

            if(computador) {
                const contrato = contratoRepository.create({
                    id_cliente,
                    id_funcionario: computador.id_funcionario
                })

                await contratoRepository.save(contrato)

                computador.contrato_id = contrato.id

                const contratoCompurador = computadorRepository.create(computador)

                await computadorRepository.save(contratoCompurador)
            } else if(notebook) {
                const contrato = contratoRepository.create({
                    id_cliente,
                    id_funcionario: notebook.id_funcionario
                })

                await contratoRepository.save(contrato)

                notebook.id_contrato = contrato.id

                const contratoNotebook = notebookRepository.create(notebook)

                await notebookRepository.save(contratoNotebook)
            } else if(impressora) {
                const contrato = contratoRepository.create({
                    id_cliente,
                    id_funcionario: impressora.id_funcionario
                })

                await contratoRepository.save(contrato)

                impressora.id_contrato = contrato.id
                
                const contratoImpressora = impressoraRepository.create(impressora)

                await impressoraRepository.save(contratoImpressora)
            }

        });

        return data
    }
}

export default new CreateContrato()
