import Contrato from "@app/models/Contrato";

interface Request {
    id_maquina: string
    id_cliente: string
}

class CreateContrato {
    public async execute({ id_maquina, id_cliente }: Request): Promise<Contrato | null> {
        

        return null
    }
}

export default new CreateContrato()
