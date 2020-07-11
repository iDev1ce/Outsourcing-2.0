import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import Impressora from "./estoque/Impressora";

@Entity("fotos_impressora")
class FotoImpressora {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "impressora_id" })
    impressora_id: string
    
    @ManyToOne(type => Impressora, impressora => impressora.id)
    @JoinColumn({ name: "impressora_id" })
    impressora: Impressora

    @Column({ name: "foto", length: 255 })
    foto: string
    
}

export default FotoImpressora