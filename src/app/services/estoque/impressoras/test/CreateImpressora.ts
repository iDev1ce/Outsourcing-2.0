import ICreateImpressora from "@app/dto/impressora/ICreate"
import FakeImpressoraRepository from "@app/repositories/fakes/fakeImpressoraRepository"
import Impressora from "@app/models/estoque/impressora/Impressora"

class CreateImpressora {

    public async execute(
        {
            id_funcionario,
            marca,
            modelo,
            tipo,
            valor
        }:ICreateImpressora
    ):Promise<Impressora[] | null> {
        const impressoraRepository = new FakeImpressoraRepository()

        const impressora = await impressoraRepository.create({ 
            id_funcionario,
            marca,
            modelo,
            tipo,
            valor
        })

        return impressora
    }
}

export default new CreateImpressora()