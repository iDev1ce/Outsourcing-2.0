import { getCustomRepository } from "typeorm"

import ContratoRepository from "@app/repositories/ContratoRepository"
import ComputadorRepository from "@app/repositories/estoque/computador/ComputadorRepository"
import ImpressoraRepository from "@app/repositories/estoque/impressora/ImpressoraRepository"
import NotebookRepository from "@app/repositories/estoque/notebook/NotebookRepository"
import Contrato from "@app/models/Contrato"

interface Request {
    id_maquinas: Array<string>
    id_cliente: string
}

class CreateContrato {
    public async execute({ id_maquinas, id_cliente }: Request): Promise<Contrato | null> {
        const contratoRepository = getCustomRepository(ContratoRepository)
        const computadorRepository = getCustomRepository(ComputadorRepository)
        const impressoraRepository = getCustomRepository(ImpressoraRepository)
        const notebookRepository = getCustomRepository(NotebookRepository)

        let contrato = contratoRepository.create({
            id_cliente,
        })

        await contratoRepository.save(contrato)

        id_maquinas.forEach(async id => {
            let contratoData;

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

                computador.contrato_id = contrato.id

                const contratoCompurador = computadorRepository.create(computador)

                contratoData = [contratoCompurador]

                await computadorRepository.save(contratoCompurador)
            } else if(notebook) {
                notebook.id_contrato = contrato.id

                const contratoNotebook = notebookRepository.create(notebook)

                contratoData = [contratoNotebook]

                await notebookRepository.save(contratoNotebook)
            } else if(impressora) {
                impressora.id_contrato = contrato.id
                
                const contratoImpressora = impressoraRepository.create(impressora)

                contratoData = [contratoImpressora]

                await impressoraRepository.save(contratoImpressora)
            }

            if(computador) {
                contrato = contratoRepository.create({
                    id: contrato.id,
                    id_cliente,
                    id_funcionario: computador.id_funcionario
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
            } else {
                return null
            }

            return true
        });

        return contrato
    }
}

export default new CreateContrato()
