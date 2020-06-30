import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import Contrato from "./Contrato";

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

    @OneToMany(type => Contrato, contrato => contrato.id)
    @JoinColumn({ name: "id" })
    contrato: Contrato[]

}

export default Usuario