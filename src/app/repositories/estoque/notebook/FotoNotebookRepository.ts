import { EntityRepository, Repository } from "typeorm"

import FotoNotebook from "@app/models/estoque/notebook/FotoNotebook"

@EntityRepository(FotoNotebook)
class FotoNotebookRepository extends Repository<FotoNotebook> {}

export default FotoNotebookRepository