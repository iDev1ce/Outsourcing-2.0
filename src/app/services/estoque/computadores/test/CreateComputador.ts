import Computador from "@app/models/estoque/computador/Computador"
import ICreateComputador from "@app/dto/computador/ICreate"
import FakeComputadorRepository from "@app/repositories/fakes/fakeComputadorRepository"

class CreateComputador {

    public async execute(
        {
            fonte, 
            memoriaRam, 
            mouse, 
            placaMae, 
            monitor, 
            placaRede, 
            placaVideo, 
            processador, 
            teclado, 
            id_funcionario, 
            valor 
        }:ICreateComputador
    ):Promise<Computador[] | null> {
        const computadorRepository = new FakeComputadorRepository()

        const computador = await computadorRepository.create({ 
            fonte, 
            memoriaRam,
            mouse, 
            monitor, 
            placaMae, 
            placaRede, 
            placaVideo, 
            processador, 
            teclado,
            id_funcionario,
            valor
        })

        return computador
    }
}

export default new CreateComputador()