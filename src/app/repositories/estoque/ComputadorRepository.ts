import { Repository, EntityRepository } from "typeorm"

import Computador from "@app/models/estoque/Computador"

@EntityRepository(Computador)
class ComputadorRepository extends Repository<Computador> {

}

export default ComputadorRepository