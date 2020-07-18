import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm"

import Funcionario from "../Funcionarios"

@Entity("empresas_funcionarios")
class EmpresaFuncionario {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ type: "varchar", length: 100 })
    nome: string

    @Column({ type: "varchar", length: 100 })
    email: string

    @Column({ type: "varchar", length: 100 })
    senha: string

    @Column({ type: "varchar", length: 100 })
    cnpj: string

    @Column({ type: "varchar", length: 100 })
    estado: string

    @Column({ type: "varchar", length: 100 })
    cidade: string

    @Column({ type: "varchar", length: 100 })
    bairro: string

    @Column({ type: "varchar", length: 100 })
    rua: string
    
    @Column({ type: "varchar", length: 100 })
    numero: string

    @Column({ type: "varchar", length: 100 })
    cep: string

    @Column({ type: "varchar", length: 100 })
    telefone: string

    @Column({ name: "email_comercial", type: "varchar", length: 100 })
    emailComercial: string

    @OneToMany(type => Funcionario, funcionario => funcionario.id)
    @JoinColumn({ name: "id" })
    funcionarios: Funcionario

}

export default EmpresaFuncionario
