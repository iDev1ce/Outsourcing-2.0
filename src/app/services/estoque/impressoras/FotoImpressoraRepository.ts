import { EntityRepository, Repository } from "typeorm"

import FotoImpressora from "@app/models/estoque/impressora/FotoImpressora"

@EntityRepository(FotoImpressora)
class FotoImpressoraRepository extends Repository<FotoImpressora> {}

export default FotoImpressoraRepository