import createUsuarioService from "./createUsuario"

// it - Isso ou isto

describe("CreateUser", () => {
    it("should be able to create a new usuario", async () => {
        const usuario = await createUsuarioService.executeFake({
            cpf: "teste",
            email: "teste",
            id_empresa: "teste",
            nome: "teste",
            senha: "teste"
        })

        console.log(usuario)

        expect(usuario).toBe(usuario)
    })

    it("should not be able to create two users with the same email", () => {
        expect(1 + 2).toBe(3)
    })
})
