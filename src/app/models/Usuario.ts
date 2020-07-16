import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm";

import Contrato from "./Contrato";
import Chamados from "./Chamados";
import EmpresaCliente from "./EmpresaCliente";

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

    @Column({ name: "id_empresa", length: 100 })
    id_empresa: string

    @ManyToOne(type => EmpresaCliente, empresaCliente => empresaCliente.id)
    @JoinColumn({ name: 'id_empresa' })
    empresa: EmpresaCliente

    @OneToMany(type => Contrato, contrato => contrato.id)
    @JoinColumn({ name: "id" })
    contrato: Contrato[]

    @OneToMany(type => Chamados, chamados => chamados.id)
    @JoinColumn({ name: "id" })
    chamados: Chamados[]

}

export default Usuario