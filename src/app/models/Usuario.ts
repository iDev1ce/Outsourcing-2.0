import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("usuarios")
class Usuario {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    nome: string

    @Column()
    cpf: string

    @Column()
    email: string

    @Column()
    senha: string

}

export default Usuario