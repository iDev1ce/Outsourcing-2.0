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
    tipo:string
}

export default Notebooks