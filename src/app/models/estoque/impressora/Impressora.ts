import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";

import Contrato from "../../Contrato";;
import Chamados from "../../Chamados";
import Funcionario from "../../Funcionarios";
import FotoImpressora from "./FotoImpressora";
import Usuario from "@app/models/Usuario";

@Entity("impressoras")
class Impressora {
    
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column({ name: "marca", length: 100 })
    marca:string

    @Column({ name: "modelo", length: 100 })
    modelo:string

    @Column({ name: "tipo", length: 100 })
    tipo:string

    @Column({ name: "id_contrato", length: 100 })
    id_contrato: string

    @Column({ name: "id_funcionario", length: 100 })
    id_funcionario: string

    @Column({ name: "id_cliente", length: 100 })
    id_cliente: string

    @Column({ type: "varchar", length: 100 })
    valor: string

    @ManyToOne(type => Contrato, contrato => contrato.id)
    @JoinColumn({ name: "id_contrato" })
    contrato: Contrato

    @OneToMany(type => Chamados, chamados => chamados.id)
    @JoinColumn({ name: "id_chamados" })
    chamados: Chamados[]
    
    @ManyToOne(type => Funcionario, funcionario => funcionario.id)
    @JoinColumn({ name: "id_funcionario" })
    funcionario: Funcionario

    @ManyToOne(type => Usuario, usuario => usuario.id)
    @JoinColumn({ name: "id_funcionario" })
    cliente: Usuario

    @OneToMany(type => FotoImpressora, foto => foto.id)
    @JoinColumn({ name: "id" })
    foto: FotoImpressora[]
    
}

export default Impressora