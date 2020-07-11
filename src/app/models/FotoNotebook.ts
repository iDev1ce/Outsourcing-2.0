import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

import Notebooks from "./estoque/Notebooks";

@Entity("fotos_notebook")
class FotoNotebook {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ name: "notebook_id" })
    notebook_id: string
    
    @ManyToOne(type => Notebooks, notebook => notebook.id)
    @JoinColumn({ name: "notebook_id" })
    notebook: Notebooks

    @Column({ name: "foto", length: 255 })
    foto: string
    
}

export default FotoNotebook