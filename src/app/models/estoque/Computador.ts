import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, ManyToOne, JoinTable } from "typeorm";

import Contrato from "@app/models/Contrato";
import Chamados from "@app/models/Chamados";
import FotoComputador from "@app/models/FotoComputador";
import Funcionario from "@app/models/Funcionarios";
import funcionarioResource from "@app/resources/funcionarioResource";

@Entity("computadores")
class Computador {
    
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({ type: "varchar", length: 100 })
    fonte:string

    @Column({ type: "varchar", length: 100 })
    memoriaRam:string

    @Column({ type: "varchar", length: 100 })
    monitor:string

    @Column({ type: "varchar", length: 100 })
    mouse:string

    @Column({ type: "varchar", length: 100 })
    teclado:string

    @Column({ type: "varchar", length: 100 })
    processador:string

    @Column({ type: "varchar", length: 100 })
    placaMae:string

    @Column({ type: "varchar", length: 100 })
    placaRede:string

    @Column({ type: "varchar", length: 100 })
    placaVideo:string
    
    @Column({ type: "varchar", length: 100 })
    contrato_id: string

    @Column({ type: "varchar", length: 100 })
    id_funcionario:string

    @ManyToOne(type => Funcionario, funcionario => funcionario.id)
    @JoinColumn({ name: "id_funcionario" })
    funcionario: Funcionario
    
    @OneToMany(type => FotoComputador, foto => foto.id)
    @JoinColumn({ name: "id" })
    foto: FotoComputador[]

    @ManyToOne(type => Contrato, contrato => contrato.id)
    @JoinColumn({ name: "contrato_id" })
    contrato: Computador

    @OneToMany(type => Chamados, chamados => chamados.id)
    @JoinColumn({ name: "id" })
    chamados: Chamados[]

}

export default Computador