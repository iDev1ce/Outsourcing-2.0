import FakeRepository from "@app/repositories/fakes/FakeUsuarioRepository"
import ICreate from "@app/dto/funcionario/ICreate"
import Usuario from "@app/models/Usuario"

class CreateUsuarios {
    public async executeFake({ nome, cpf, email, senha }: ICreate): Promise<Usuario[] | null | string> {
        const fakeRepository = new FakeRepository()

        const usuario = await fakeRepository.create({
            cpf: cpf,
            email: email,
            nome: nome,
            senha: senha
        })
        
        return usuario
    }
}

export default new CreateUsuarios()