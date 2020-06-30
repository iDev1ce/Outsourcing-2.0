import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany } from "typeorm";

import Contrato from "./Contrato";
import Computador from "./estoque/Computador";
import Notebooks from "./estoque/Notebooks";
import Impressora from "./estoque/Impressora";

@Entity("chamados")
class Chamados {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "varchar", length: 100 })
    id_contrato: string

    @Column({ name: "varchar", length: 100 })
    id_computador: string

    @Column({ name: "varchar", length: 100 })
    id_notebook: string

    @Column({ name: "varchar", length: 100 })
    id_impressora: string

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

    @OneToMany(type => Chamados, chamados => chamados.id)
    @JoinColumn({ name: "id" })
    chamados: Chamados

}

export default Chamados