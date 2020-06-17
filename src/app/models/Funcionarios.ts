import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("funcionarios")
class Funcionario {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    cpf: string

    @Column()
    nome: string

    @Column()
    email: string

    @Column()
    senha: string

}

export default Funcionario