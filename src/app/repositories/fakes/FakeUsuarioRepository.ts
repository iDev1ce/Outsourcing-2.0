import { uuid } from "uuidv4"

import ICreate from "@app/dto/usuario/ICreate"
import Usuario from "@app/models/Usuario"

class FakeUsuarioRepository {
    private usuarios: Usuario[] = []

    public async findByEmail(email: string): Promise<Usuario | null> {
        const findEmail = this.usuarios.find(usuario => {
            usuario.email === email
        })
        
        return findEmail || null
    }

    public async findByCpf(cpf: string): Promise<Usuario | null> {
        const findCpf = this.usuarios.find(usuario => {
            usuario.cpf === cpf
        })
        
        return findCpf || null
    }

    public async create({
        cpf,
        email,
        nome,
        senha
    }: ICreate): Promise<Usuario[] | null> {
        const usuario = new Usuario()

        usuario.nome = nome
        usuario.cpf = cpf
        usuario.email = email
        usuario.senha = senha

        this.usuarios.push(usuario)

        return this.usuarios
    }
}

export default FakeUsuarioRepository