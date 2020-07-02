interface Request {
    id_funcionario:string
    id_cliente:string
}

class CreateContrato {
    public async execute({ id_funcionario, id_cliente }:Request) {

    }
}

export default new CreateContrato()