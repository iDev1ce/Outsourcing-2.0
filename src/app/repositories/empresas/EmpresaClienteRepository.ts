import { EntityRepository, Repository } from "typeorm";

import EmpresaCliente from "@app/models/empresas/EmpresaCliente";

@EntityRepository(EmpresaCliente)
class EmpresaClienteRepository extends Repository<EmpresaCliente> {}

export default EmpresaClienteRepository
