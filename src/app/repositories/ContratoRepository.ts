import { EntityRepository, Repository } from "typeorm";

import Contrato from "../models/Contrato";

@EntityRepository(Contrato)
class ContratoRepository extends Repository<Contrato> {}

export default ContratoRepository