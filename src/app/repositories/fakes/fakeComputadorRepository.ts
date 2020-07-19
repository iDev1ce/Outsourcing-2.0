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

        computador.id = uuid()
        computador.fonte = fonte
        computador.processador = processador
        computador.memoriaRam = memoriaRam
        computador.monitor = monitor
        computador.mouse = mouse
        computador.teclado = teclado
        computador.placaMae = placaMae
        computador.placaRede = placaRede
        computador.placaVideo = placaVideo
        computador.id_funcionario = id_funcionario
        computador.valor = valor

        this.computadores.push(computador)

        return this.computadores
    }
}

export default ComputadorRepository
