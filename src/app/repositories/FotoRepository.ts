import { EntityRepository, Repository } from "typeorm";

import Fotos from "../../app/models/Fotos";

@EntityRepository(Fotos)
class FotoRepository extends Repository<Fotos> {}

export default FotoRepository