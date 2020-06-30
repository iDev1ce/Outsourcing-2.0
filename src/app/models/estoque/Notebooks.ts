import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import Contrato from "../Contrato";
import Chamados from "../Chamados";

@Entity("notebooks")
class Notebooks {
    
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({ name: "varchar", length: 100 })
    marca:string

    @Column({ name: "varchar", length: 100 })
    modelo:string

    @Column({ name: "varchar", length: 100 })
    memoriaRam:string

    @Column({ name: "varchar", length: 100 })
    placaVideo:string

    @Column({ name: "varchar", length: 100 })
    tipoPlacaVideo:string

    @Column({ name: "varchar", length: 100 })
    processador:string

    @Column({ name: "varchar", length: 100 })
    tamanhoDaTela:string

    @Column({ name: "varchar", length: 100 })
    contrato_id: string

    @ManyToOne(type => Contrato, contrato => contrato.id)
    @JoinColumn({ name: "id_contrato" })
    contrato: Contrato

    @OneToMany(type => Chamados, chamados => chamados.id_notebook)
    @JoinColumn({ name: "id" })
    chamados: Chamados[]

}

export default Notebooks