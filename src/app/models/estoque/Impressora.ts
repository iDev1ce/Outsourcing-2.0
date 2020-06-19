import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("impressoras")
class Impressora {
    
    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    marca:string

    @Column()
    modelo:string

    @Column()
    tipo:string
}

export default Impressora