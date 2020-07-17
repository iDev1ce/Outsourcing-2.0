import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

import Contrato from "../../Contrato";
import Chamados from "../../Chamados";
import Funcionario from "../../Funcionarios";
import FotoNotebook from "./FotoNotebook";

@Entity("notebooks")
class Notebooks {
    
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({ name: "marca", length: 100 })
    marca:string

    @Column({ name: "modelo", length: 100 })
    modelo:string

    @Column({ name: "memoriaRam", length: 100 })
    memoriaRam:string

    @Column({ name: "placaVideo", length: 100 })
    placaVideo:string

    @Column({ name: "tipoPlacaVideo", length: 100 })
    tipoPlacaVideo:string

    @Column({ name: "processador", length: 100 })
    processador:string

    @Column({ name: "tamanhoDaTela", length: 100 })
    tamanhoDaTela:string

    @Column({ name: "id_funcionario" })
    id_funcionario: string

    @Column({ name: "id_contrato", length: 100 })
    id_contrato: string

    @ManyToOne(type => Funcionario, funcionario => funcionario.id)
    @JoinColumn({ name: "id_funcionario" })
    funcionario: Funcionario

    @ManyToOne(type => Contrato, contrato => contrato.id)
    @JoinColumn({ name: "id_contrato" })
    contrato: Contrato

    @OneToMany(type => Chamados, chamados => chamados.id_notebook)
    @JoinColumn({ name: "id_chamados" })
    chamados: Chamados[]

    @OneToMany(type => FotoNotebook, foto => foto.id)
    @JoinColumn({ name: "id" })
    foto: FotoNotebook[]

}

export default Notebooks