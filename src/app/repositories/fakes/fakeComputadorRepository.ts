import { uuid } from "uuidv4"

import Computador from "@app/models/estoque/computador/Computador"
import ICreate from "@app/dto/computador/ICreate"

class ComputadorRepository {
    private computadores: Computador[] = []

    public async create({
        fonte,
        memoriaRam,
        monitor,
        mouse,
        teclado,
        processador,
        placaMae,
        placaRede,
        placaVideo,
        id_funcionario,
        valor
    }: ICreate): Promise<Computador[] | null> {
        const computador = new Computador()

        Object.assign(computador, { 
            id: uuid(),
            fonte,
            processador,
            memoriaRam,
            monitor,
            mouse,
            teclado,
            placaMae,
            placaRede,
            placaVideo,
            id_funcionario,
            valor
        })

        this.computadores.push(computador)

        return this.computadores
    }
}

export default ComputadorRepository
