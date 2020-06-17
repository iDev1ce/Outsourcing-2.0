import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

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

    @Column("datetime")
    date: Timestamp

}

export default Usuario