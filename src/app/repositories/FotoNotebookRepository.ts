import { EntityRepository, Repository } from "typeorm"

import FotoNotebook from "@app/models/FotoNotebook"

@EntityRepository(FotoNotebook)
class FotoNotebookRepository extends Repository<FotoNotebook> {}

export default FotoNotebookRepository