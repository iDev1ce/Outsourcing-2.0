import { EntityRepository, Repository } from "typeorm"

import FotoComputador from "@app/models/estoque/computador/FotoComputador"

@EntityRepository(FotoComputador)
class FotoRepository extends Repository<FotoComputador> {}

export default FotoRepository