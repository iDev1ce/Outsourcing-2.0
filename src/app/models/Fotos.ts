import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("fotos")
class Fotos {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "foto", length: 255 })
    foto: string
    
}

export default Fotos