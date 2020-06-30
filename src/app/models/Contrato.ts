import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Column, JoinColumn } from "typeorm";

import Usuario from "./Usuario";
import Chamados from "./Chamados";
import Computador from "./estoque/Computador";
import Notebooks from "./estoque/Notebooks";
import Impressora from "./estoque/Impressora";
import Funcionario from "./Funcionarios";

@Entity("contratos")
class Contrato {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    id_cliente: string
    
    @Column()
    id_funcionario: string

    @ManyToOne(type => Usuario, usuario => usuario.id)
    @JoinColumn({ name: "id_cliente" })
    cliente: Usuario

    @ManyToOne(type => Funcionario, funcionario => funcionario.id)
    @JoinColumn({ name: "id_funcionario" })
    funcionario: Funcionario

    @OneToMany(type => Notebooks, notebooks => notebooks.id)
    @JoinColumn({ name: "id" })
    notebook: Notebooks[]
    
    @OneToMany(type => Impressora, impressora => impressora.id)
    @JoinColumn({ name: "id" })
    impressora: Impressora[]

    @OneToMany(type => Computador, computador => computador.id)
    @JoinColumn({ name: "id" })
    computador: Computador[]

    @OneToMany(type => Chamados, chamados => chamados.id)
    @JoinColumn({ name: "id" })
    chamados: Chamados[]

}

export default Contrato