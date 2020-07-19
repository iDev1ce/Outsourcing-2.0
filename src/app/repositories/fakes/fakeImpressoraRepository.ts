import { uuid } from "uuidv4"

import ICreate from "@app/dto/impressora/ICreate"
import Impressora from "@app/models/estoque/impressora/Impressora"

class ImpressoraRepository {
    private impressoras: Impressora[] = []

    public async create({
        id_funcionario,
        marca,
        modelo,
        tipo,
        valor
    }: ICreate): Promise<Impressora[] | null> {
        const impressora = new Impressora()

        impressora.id = uuid()
        impressora.marca = marca 
        impressora.modelo = modelo
        impressora.tipo = tipo
        impressora.id_funcionario = id_funcionario
        impressora.valor = valor

        this.impressoras.push(impressora)

        return this.impressoras
    }
}

export default ImpressoraRepository
