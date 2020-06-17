import { Repository, EntityRepository } from "typeorm"
import Computador from "../../models/Computador";

@EntityRepository(Computador)
class ComputadorRepository extends Repository<Computador> {

}

export default ComputadorRepository