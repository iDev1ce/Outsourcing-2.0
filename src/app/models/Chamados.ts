import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";

import Contrato from "./Contrato";
import Computador from "./estoque/computador/Computador";
import Notebooks from "./estoque/notebook/Notebooks";
import Impressora from "./estoque/impressora/Impressora";
import Usuario from "./Usuario";
import Funcionario from "./Funcionarios";

@Entity("chamados")
class Chamados {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "id_contrato", length: 100 })
    id_contrato: string

    @Column({ name: "id_computador", length: 100 })
    id_computador: string

    @Column({ name: "id_notebook", length: 100 })
    id_notebook: string

    @Column({ name: "id_impressora", length: 100 })
    id_impressora: string

    @Column({ name: "id_cliente", length: 100 })
    id_cliente: string

    @Column({ name: "id_funcionario", length: 100 })
    id_funcionario: string

    @Column({ type: "text", name: "descricao" })
    descricao: string

    @ManyToOne(type => Contrato, contrato => contrato.id)
    @JoinColumn({ name: "id_contrato" })
    contrato: Contrato

    @ManyToOne(type => Computador, computador => computador.id)
    @JoinColumn({ name: "id_computador" })
    computador: Computador

    @ManyToOne(type => Notebooks, notebook => notebook.id)
    @JoinColumn({ name: "id_notebook" })
    notebook: Notebooks

    @ManyToOne(type => Impressora, impressora => impressora.id)
    @JoinColumn({ name: "id_impressora" })
    impressora: Impressora

    @ManyToOne(type => Usuario, usuario => usuario.id)
    @JoinColumn({ name: "id_cliente" })
    cliente: Usuario

    @ManyToOne(type => Funcionario, funcionario => funcionario.id)
    @JoinColumn({ name: "id_funcionario" })
    funcionario: Funcionario

}

export default Chamados