import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("notebooks")
class Notebooks {
    
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    marca:string

    @Column()
    modelo:string

    @Column()
    memoriaRam:string

    @Column()
    placaVideo:string

    @Column()
    tipoPlacaVideo:string

    @Column()
    processador:string

    @Column()
    tamanhoDaTela:string
}

export default Notebooks