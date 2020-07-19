import createComputadorService from "./CreateComputador"

// it - Isso ou isto
// CI - Executar testes

describe("CreateComputador", () => {
    it("should be able to create a new computer", async () => {
        
        const computador = await createComputadorService.execute({
            fonte: "teste",
            id_funcionario: "teste",
            memoriaRam: "teste",
            monitor: "teste",
            mouse: "teste",
            placaMae: "teste",
            placaRede: "teste",
            placaVideo: "teste",
            processador: "teste",
            teclado: "teste",
            valor: "1444"
        })
        
        console.log(computador)

        expect(computador)
    })
})
