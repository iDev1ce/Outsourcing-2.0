import { Repository, EntityRepository } from "typeorm"
import Computador from "../../models/estoque/Computador";

@EntityRepository(Computador)
class ComputadorRepository extends Repository<Computador> {

}

export default ComputadorRepository