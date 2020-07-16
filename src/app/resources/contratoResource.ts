import { Request, Response } from "express"

import createContrato from '@app/services/contratos/CreateContrato'

class ContratoResource {
    public async insert(req: Request, res: Response) {
        const { id_maquinas } = req.body

        const contrato = createContrato.execute({ 
            id_maquinas,
            id_cliente: req.user.id 
        })

        if(!contrato)
            return res.status(400).send({ message: "erro ao criar contrato" })
        return res.status(201).send(contrato)
    }

    public async getAll(req: Request, res: Response) {
        
    }
}

export default new ContratoResource()