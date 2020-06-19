import { Repository, EntityRepository } from "typeorm"
import Impressora from "../../models/estoque/Impressora";

@EntityRepository(Impressora)
class ImpressoraRepository extends Repository<Impressora> {

}

export default ImpressoraRepository