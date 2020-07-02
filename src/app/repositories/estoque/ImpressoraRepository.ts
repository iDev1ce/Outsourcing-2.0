import { Repository, EntityRepository } from "typeorm"

import Impressora from "@app/models/estoque/Impressora"

@EntityRepository(Impressora)
class ImpressoraRepository extends Repository<Impressora> {

}

export default ImpressoraRepository