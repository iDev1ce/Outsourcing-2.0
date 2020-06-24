import { Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import Contrato from "./Contrato";

@Entity("chamados")
class Chamados {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToMany(type => Contrato, contrato => contrato.id)
    id_contrato: string

}

export default Chamados