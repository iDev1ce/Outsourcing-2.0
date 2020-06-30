import { EntityRepository, Repository } from "typeorm";

import FotoComputador from "../models/FotoComputador";

@EntityRepository(FotoComputador)
class FotoRepository extends Repository<FotoComputador> {}

export default FotoRepository