// import { getCustomRepository } from "typeorm";

// import Chamados from "../../../models/Chamados";
// import ChamadoRepository from "../../../repositories/ChamadoRepository"

// interface Request {
//     id: string
//     id_contrato: string
// }

class CreateChamado {
    public async execute() {
        // const chamadosRepository = getCustomRepository(ChamadoRepository)

        // const chamado = chamadosRepository.create({ id_impressora: id, id_contrato })

        // await chamadosRepository.save(chamado)

        // return chamado
    }
}

export default new CreateChamado()