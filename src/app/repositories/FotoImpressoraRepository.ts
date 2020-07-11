import { EntityRepository, Repository } from "typeorm"

import FotoImpressora from "@app/models/FotoImpressora"

@EntityRepository(FotoImpressora)
class FotoImpressoraRepository extends Repository<FotoImpressora> {}

export default FotoImpressoraRepository