import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Contrato from "./Contrato";

@Entity("fornecedores")
class Fornecedor {

    @PrimaryGeneratedColumn("uuid")
    id: string

    id_contrato: string

    @Column({ type: "varchar", length: 100 })
    nome: string

    @Column({ type: "varchar", length: 100 })
    email: string

    @Column({ type: "varchar", length: 150 })
    senha: string

    @Column({ type: "varchar", length: 100 })
    cnpj: string

    @OneToMany(type => Contrato, contrato => contrato.id)
    contrato_id: Contrato

}

export default Fornecedor