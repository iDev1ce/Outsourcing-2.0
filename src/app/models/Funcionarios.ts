import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne } from "typeorm"

import Contrato from "./Contrato"
import Impressora from "./estoque/Impressora"
import Notebooks from "./estoque/Notebooks"
import Computador from "./estoque/Computador"
import Empresa from "./EmpresaCliente"

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

    @OneToMany(type => Contrato, contrato => contrato.id)
    @JoinColumn({ name: "id" })
    contrato: Contrato[]

    @OneToMany(type => Impressora, impressora => impressora.id)
    @JoinColumn({ name: "id" })
    impressora: Impressora[]

    @OneToMany(type => Notebooks, notebook => notebook.id)
    @JoinColumn({ name: "id" })
    notebook: Notebooks[]

    @OneToMany(type => Computador, computador => computador.id)
    @JoinColumn({ name: "id" })
    computador: Computador[]

}

export default Funcionario