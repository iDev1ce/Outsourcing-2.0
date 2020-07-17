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

interface Response {
    contrato: Contrato
    teste: string
}

class CreateContrato {

    private teste = 'fodase.'

    private async retornaValor(valor: any, contrato: Contrato) {
        const contratoRepository = getCustomRepository(ContratoRepository)

        const contr = contratoRepository.create({
            id: contrato.id,
            valor: valor
        })

        this.teste = valor

        await contratoRepository.save(contr)

        return valor
    }

    private async retornaCliente(id_contrato: string) {
        const contratoRepository = getCustomRepository(ContratoRepository)
    
        const contrato = await contratoRepository.findOne({
            where: {
                id: id_contrato
            }
        })

        return contrato
    }

    public async execute({ id_maquinas, id_cliente }: Request): Promise<Response | null | undefined> {
        const contratoRepository = getCustomRepository(ContratoRepository)
        const computadorRepository = getCustomRepository(ComputadorRepository)
        const impressoraRepository = getCustomRepository(ImpressoraRepository)
        const notebookRepository = getCustomRepository(NotebookRepository)

        let contrato = contratoRepository.create({
            id_cliente
        })

        await contratoRepository.save(contrato)

        let valor = 0


        id_maquinas.map(async id => {
            let valorContrato = 0
            let valorTotal = []
            let contratoData

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
                
                let valorComputador = parseFloat(computador.valor)
                valorTotal.push(valorComputador)

                await computadorRepository.save(contratoCompurador)
            } else if(notebook) {
                notebook.id_contrato = contrato.id

                const contratoNotebook = notebookRepository.create(notebook)

                contratoData = [contratoNotebook]

                let valorNotebook = parseFloat(notebook.valor)
                valorTotal.push(valorNotebook)

                await notebookRepository.save(contratoNotebook)
            } else if(impressora) {
                impressora.id_contrato = contrato.id
                
                const contratoImpressora = impressoraRepository.create(impressora)

                contratoData = [contratoImpressora]

                let valorImpressora = parseFloat(impressora.valor)
                valorTotal.push(valorImpressora)

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
            } else {
                return null
            }

            if(!valorTotal)
                return null

            valorTotal.map(valor2 => {
                valor += valorContrato + valor2
            })

            this.teste = String(valor)

            const valorCorreto = await this.retornaValor(valor, contrato)
            // console.log(valorCorreto)
            
            return valorCorreto
        });

        // console.log(coisa)

        // console.log(valor)

        // const valorDoBanco = await contratoRepository.findOne({
        //     where: {
        //         id: contrato.id
        //     }
        // })

        const valorDoBanco = await this.retornaCliente(contrato.id)

        // console.log('aaaaaaaaaaaaaaaaaaaaa\n')
        // console.log(valorDoBanco)
        // console.log('\naaaaaaaaaaaaaaaaaaaaa')

        let teste = this.teste

        console.log(teste)

        return { contrato, teste }
    }
}

export default new CreateContrato()
