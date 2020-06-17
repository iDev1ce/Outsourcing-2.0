import { Repository, EntityRepository } from "typeorm"
import Impressora from "../../models/Impressora";

@EntityRepository(Impressora)
class ImpressoraRepository extends Repository<Impressora> {

}

export default ImpressoraRepository