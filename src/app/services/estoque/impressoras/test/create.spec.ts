import createImpressoraService from "./CreateImpressora"

describe("CreateImpressora", () => {
    it("should be able to create a new impressora", async () => {
        
        const impressora = await createImpressoraService.execute({
            id_funcionario: "teste",
            marca: "test",
            modelo: "teste",
            tipo: "teste",
            valor: "teste"
        })
        
        console.log(impressora)

        expect(impressora)
    })
})
