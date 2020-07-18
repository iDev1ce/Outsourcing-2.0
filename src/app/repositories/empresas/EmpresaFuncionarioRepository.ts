import { EntityRepository, Repository } from "typeorm"

import EmpresaFuncionario from "@app/models/empresas/EmpresaFuncionario"

@EntityRepository(EmpresaFuncionario)
class EmpresaFuncionarioRepository extends Repository<EmpresaFuncionario> {}

export default EmpresaFuncionarioRepository
