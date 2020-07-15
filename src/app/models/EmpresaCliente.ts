import { PrimaryGeneratedColumn, Column, Entity, OneToMany, JoinColumn } from "typeorm"

import Usuario from "./Usuario"

@Entity('empresas_clientes')
class EmpresaCliente {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    nome: string

    @Column()
    estado: string

    @Column()
    cidade: string

    @Column()
    bairro: string

    @Column()
    rua: string

    @Column()
    numero: string

    @Column()
    cep: string

    @Column()
    email: string

    @Column()
    telefone: string

    @Column()
    cnpj: string

    @OneToMany(type => Usuario, usuario => usuario.id)
    @JoinColumn({ name: 'id' })
    cliente: Usuario

}

export default EmpresaCliente;