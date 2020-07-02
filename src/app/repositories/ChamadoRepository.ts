import { EntityRepository, Repository } from "typeorm"

import Chamados from "@app/models/Chamados"

@EntityRepository(Chamados)
class ChamadoRepository extends Repository<Chamados> {}

export default ChamadoRepository