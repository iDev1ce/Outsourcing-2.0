import { Repository, EntityRepository } from "typeorm"

import Impressora from "@app/models/estoque/impressora/Impressora"

@EntityRepository(Impressora)
class ImpressoraRepository extends Repository<Impressora> {

}

export default ImpressoraRepository