import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import Usuario from "./Usuario";
import Fornecedor from "./Fornecedor";
import Chamados from "./Chamados";

@Entity("contratos")
class Contrato {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(type => Usuario, usuario => usuario.id)
    id_cliente: Usuario

    @ManyToOne(type => Fornecedor, fornecedor => fornecedor.id)
    id_fornecedor: Fornecedor

    
    id_maq_contrato: string

    @ManyToOne(type => Chamados, chamados => chamados.id)
    id_chamado: Chamados[]
    
}

export default Contrato