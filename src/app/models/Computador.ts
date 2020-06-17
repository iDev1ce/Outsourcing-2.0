import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}

export default Computador