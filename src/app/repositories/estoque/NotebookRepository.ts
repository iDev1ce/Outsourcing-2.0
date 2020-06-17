import { Repository, EntityRepository } from "typeorm"
import Notebooks from "../../models/Notebooks";

@EntityRepository(Notebooks)
class NotebookRepository extends Repository<Notebooks> {

}

export default NotebookRepository