import { Repository, EntityRepository } from "typeorm"

import Notebooks from "@app/models/estoque/notebook/Notebooks"

@EntityRepository(Notebooks)
class NotebookRepository extends Repository<Notebooks> {

}

export default NotebookRepository