import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import Computador from "./estoque/Computador";

@Entity("fotos_computadores")
class FotoComputador {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "computador_id" })
    computador_id: string
    
    @ManyToOne(type => Computador, computador => computador.id)
    @JoinColumn({ name: "computador_id" })
    computador: Computador

    @Column({ name: "foto", length: 255 })
    foto: string
    
}

export default FotoComputador