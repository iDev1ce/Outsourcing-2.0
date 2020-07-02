import { EntityRepository, Repository } from "typeorm"

import Funcionario from "@app/models/Funcionarios"

@EntityRepository(Funcionario)
class FuncionarioRepository extends Repository<Funcionario> {}

export default FuncionarioRepository;