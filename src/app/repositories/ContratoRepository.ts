import { EntityRepository, Repository } from "typeorm"

import Contrato from "@app/models/Contrato"

@EntityRepository(Contrato)
class ContratoRepository extends Repository<Contrato> {}

export default ContratoRepository